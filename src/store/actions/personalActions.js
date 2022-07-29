import {
  SET_PERSONAL_FORM_DATA,
  SET_SELFIE,
  SET_IC_IMG,
  RESET_PERSONAL_FORM_DATA,
  SET_VERIFY_CODE_FAILURE_DIALOG,
  IS_LOADING,
} from "../types";
import api from '../../utils/api';

export const personalActions = (props) => {
  return {
    setPersonalFormData: (data) => {
      props.dispatch({ type: SET_PERSONAL_FORM_DATA, data })
    },
    setSelfie:  (data) => {
      props.dispatch({ type: SET_SELFIE, data });
    },
    setIcImg:  (data) => {
      props.dispatch({ type: SET_IC_IMG, data });
    },
    resetPersonalData: () => {
      props.dispatch({ type: RESET_PERSONAL_FORM_DATA });
    },
    checkKTP: (data) => {
      props.dispatch({ type: IS_LOADING, data: true });
      return api.get(`/REST-LMSCore/services/util/validateKTP?transID=${props.state.generalStates.transID}` +
      `&sessionKey=${props.state.generalStates.sessionKey}` +
      `&age=${data.age}` +
      `&gender=${data.gender}` +
      `&KTP=${data.ktp}`).then(res => {
        return true;
      }).catch(error => {
        props.dispatch({
          type: SET_VERIFY_CODE_FAILURE_DIALOG, data: {
            dialog: {
              dialogTitle: "Invalid KTP",
              dialogContent: "Data tidak sesuai"
            },
            show: true
          }
        });
        return false;
      }).finally(() => {
        props.dispatch({ type: IS_LOADING, data: false });
      });
    }
  }
}