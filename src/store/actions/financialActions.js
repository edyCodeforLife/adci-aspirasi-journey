import {
  SET_FINANCING_FORM_DATA,
  RESET_FINANCING_FORM_DATA,
  SET_FINANCING_AMOUNT,
  SET_DURATION,
  SET_VERIFY_CODE_FAILURE_DIALOG,
  SET_GENERAL_DATA,
  SET_AGREEMENT_1,
  SET_AGREEMENT_2,
  SET_AGREEMENT_3,
} from "../types";
import api from '../../utils/api';
import _ from 'lodash';
import { toNumber } from '../../utils';


export const financialActions = (props) => {
  return {
    setFinancingAmount: (data) => {
      props.dispatch({ type: SET_FINANCING_AMOUNT, data });
    },
    resetFinancialData: () => {
      props.dispatch({ type: RESET_FINANCING_FORM_DATA });
    },
    setDuration: (data) => {
      props.dispatch({ type: SET_DURATION, data });
    },
    setAgreement1: (data) => {
      props.dispatch({ type: SET_AGREEMENT_1, data });
    },
    setAgreement2: (data) => {
      props.dispatch({ type: SET_AGREEMENT_2, data });
    },
    setAgreement3: (data) => {
      props.dispatch({ type: SET_AGREEMENT_3, data });
    },
    calculateFinancing: _.debounce(({ amount, duration }) => {
      const selectedDuration = _.find(props.state.generalStates.financingOption, { 'tenure': duration });
      if (!_.isEmpty(selectedDuration)){

        // console.log("lms"+'/REST-LMSCore/services/lms/calculateFinancing?transID=${props.state.generalStates.transID}' +
        // `&sessionKey=${props.state.generalStates.sessionKey}` +
        // `&principal=${toNumber(amount)}` +
        // `&tenure=${selectedDuration.tenure}` +
        // `&timeUnit=${selectedDuration.timeUnit}`+`/REST-LMSCore/services/ss/getSupplementaryServices?transID=${props.state.generalStates.transID}` +
        // `&sessionKey=${props.state.generalStates.sessionKey}` +
        // `&principal=${toNumber(amount)}` +
        // `&tenure=${selectedDuration.tenure}` +
        // `&timeUnit=${selectedDuration.timeUnit}`)

        return Promise.all([
          api.get(`/REST-LMSCore/services/lms/calculateFinancing?transID=${props.state.generalStates.transID}` +
          `&sessionKey=${props.state.generalStates.sessionKey}` +
          `&principal=${toNumber(amount)}` +
          `&tenure=${selectedDuration.tenure}` +
          `&timeUnit=${selectedDuration.timeUnit}`), 
          api.get(`/REST-LMSCore/services/ss/getSupplementaryServices?transID=${props.state.generalStates.transID}` +
          `&sessionKey=${props.state.generalStates.sessionKey}` +
          `&principal=${toNumber(amount)}` +
          `&tenure=${selectedDuration.tenure}` +
          `&timeUnit=${selectedDuration.timeUnit}`)
        ]).then(function(values) {
          const isInsuranceProduct = (values[1].data?.length > 0);
          props.dispatch({ type: SET_FINANCING_FORM_DATA, 
            data: { 
              repayment: { 
                ...values[0].data, 
                insurancePremium:  isInsuranceProduct ? values[1].data[0].price : 0,
              } 
            } 
          });
          props.dispatch({ type: SET_GENERAL_DATA, 
            data: {
              isInsuranceProduct,
              insurance: isInsuranceProduct ? values[1].data[0] : null,
            }
          });
        }).catch(error => {
          props.dispatch({
            type: SET_VERIFY_CODE_FAILURE_DIALOG, data: {
              dialog: {
                dialogTitle: "Invalid Action",
                dialogContent: error?.data?.error?.message
              },
              show: true
            }
          });
          props.dispatch({ type: RESET_FINANCING_FORM_DATA }); 
        });
      }
    }, 150)    
  }
}