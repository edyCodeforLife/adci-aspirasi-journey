import {
  IS_LOADING,
  SET_CODE,
  SET_REQUEST_OTP_STATUS,
  SET_ERROR,
  NEXT_STEP,
  PREVIOUS_STEP,
  RESET_STEP,
  SET_STEP,
  SET_GENERAL_DATA,
  RESET_GENERAL_DATA,
  SET_VERIFY_CODE_FAILURE_DIALOG,
  SET_REFERENCE_IMG,
  SET_ENCODE_URI_BK
} from "../types";
import api from '../../utils/api';
import _ from 'lodash';
import { toNumber } from '../../utils'
import * as Sentry from '@sentry/browser';
import { SV_GET_CONTRACT, SV_THANK_YOU } from "../../helpers/endpoints";

export const generalActions = (props) => {
  return {
    setGeneralData: (data) => {
      props.dispatch({ type: SET_GENERAL_DATA, data })
    },
    setReferenceImage: (data) => {
      props.dispatch({ type: SET_REFERENCE_IMG, data })
    },
    setEncodeBK: (data) => {
      props.dispatch({ type: SET_ENCODE_URI_BK, data })
    },
    resetGeneralData: () => {
      props.dispatch({ type: RESET_GENERAL_DATA });
    },
    setVerifyCodeFailureDialog: (data) => {
      props.dispatch({ type: SET_VERIFY_CODE_FAILURE_DIALOG, data });
    },
    isLoading: (data) => {
      props.dispatch({ type: IS_LOADING, data });
    },
    nextStep: () => {
      props.dispatch({ type: NEXT_STEP });
    },
    previousStep: () => {
      props.dispatch({ type: PREVIOUS_STEP });
    },
    resetStep: () => {
      props.dispatch({ type: RESET_STEP });
    },
    setStep: (data) => {
      props.dispatch({ type: SET_STEP, data });
    },
    getVerifyToken: (data, history) => {
      props.dispatch({ type: IS_LOADING, data: true });
      props.dispatch({ type: SET_CODE, data: data.code });
      return api
        .get(`/REST-LMSCore/services/lms/getToken?code=${data.code}&transID=${props.state.generalStates.transID}`)
        .then(res => {
          props.dispatch({ type: IS_LOADING, data: false });
          props.dispatch({
            type: SET_GENERAL_DATA,
            data: res.data,
          });
          history.push(`/journey/${data.code}`)
        })
        .catch(error => {
          props.dispatch({ type: IS_LOADING, data: false });
          Sentry.captureMessage(error);
          props.dispatch({
            type: SET_ERROR,
            data: error,
          });
          props.dispatch({
            type: SET_VERIFY_CODE_FAILURE_DIALOG, data: {
              dialog: {
                dialogTitle: "Invalid Token",
                dialogContent: "Token is not ready to use!, Please try again later."
              },
              show: true
            }
          });
        });
    },
    requestOTP: () => {
      props.dispatch({ type: IS_LOADING, data: true });
      return api
        .get(`/REST-LMSCore/services/lms/sendOTP?sessionKey=${props.state.generalStates.sessionKey}&transID=${props.state.generalStates.transID}`)
        .then(res => {
          props.dispatch({ type: SET_REQUEST_OTP_STATUS, data: true });
          props.dispatch({ type: IS_LOADING, data: false });
          props.dispatch({
            type: SET_VERIFY_CODE_FAILURE_DIALOG, data: {
              dialog: {
                dialogTitle: "Request OTP Success",
                dialogContent: ""
              },
              show: true
            }
          });
        })
        .catch(error => {
          props.dispatch({ type: IS_LOADING, data: false });
          Sentry.captureMessage(error);
          props.dispatch({
            type: SET_ERROR,
            data: error,
          });
          props.dispatch({
            type: SET_VERIFY_CODE_FAILURE_DIALOG, data: {
              dialog: {
                dialogTitle: "Invalid Action",
                dialogContent: "Please try again later."
              },
              show: true
            }
          });
        });
    },
    verifyOTP: (data, history) => {
      props.dispatch({ type: IS_LOADING, data: true });
      return api
        .get(`/REST-LMSCore/services/lms/validateOTP?sessionKey=${props.state.generalStates.sessionKey}` +
          `&OTP=${data.otp}` +
          `&transID=${props.state.generalStates.transID}`)
        .then(() => {
          return api
            .get(`/REST-LMSCore/services/lms/confirm?sessionKey=${props.state.generalStates.sessionKey}`)
            .then(res => {

              if (props.state.generalStates.reference === "bk") {
                return api.getUAT(SV_GET_CONTRACT + "?applicationId=" + props.state.generalStates.merchant.applicationID)
                  .then((res) => {
                    var decoded = decodeURI(props.state.generalStates.encodeBk);
                    var uriSupply = decoded+"?status=success&contractId=" + res.data.contractId + "&contractKey=" + res.data.contractKey;

                    props.dispatch({ type: IS_LOADING, data: false });
                    sessionStorage.setItem("masterAgreement", res.data.masterAgreement);
                    window.location.href = uriSupply;
                    // if(wnd){
                    //     setTimeout(function () { wnd.close();

                    //     }, 20);
                    //   }
                  }).catch(error => {
                    console.log("ERROR WHEN GET CONTRACT");
                    props.dispatch({ type: IS_LOADING, data: false });
                    Sentry.captureMessage(error);
                  })
              } else {
                props.dispatch({ type: IS_LOADING, data: false });
                sessionStorage.setItem("masterAgreement", res.data.masterAgreement);
                history.push(`/contract-success`);
              }
            })
            .catch(error => {
              props.dispatch({ type: IS_LOADING, data: false });
              Sentry.captureMessage(error);
              props.dispatch({
                type: SET_ERROR,
                data: error,
              });
            });
        })
        .catch(error => {
          // alert(JSON.stringify(error))
          props.dispatch({ type: IS_LOADING, data: false });
          Sentry.captureMessage(error);
          props.dispatch({
            type: SET_VERIFY_CODE_FAILURE_DIALOG, data: {
              dialog: {
                dialogTitle: "Invalid Code",
                dialogContent: "Please try again later."
              },
              show: true
            }
          });
          props.dispatch({
            type: SET_ERROR,
            data: error,
          });
        });
    },

    submitApplication: (data, supplementaryServiceID) => {
      props.dispatch({ type: IS_LOADING, data: true });

      const params = {
        "sessionKey": props.state.generalStates.sessionKey,
        "totalLoan": toNumber(props.state.financialStates.financingAmount),
        "loanDuration": props.state.financialStates.duration,
        "monthlyIncome": toNumber(props.state.businessStates.monthlyIncome),
        "totalOutlet": props.state.businessStates.totalOutlet,
        "storeImg": props.state.businessStates.storeImg,
        "ssmImg": props.state.businessStates.ssmImg,
        "gender": data.gender,
        "maritalStatus": data.maritalStatus,
        "educationLevel": data.educationLevel,
        "totalChildren": data.numberOfChild,
        "jobType": data.jobType,
        "totalAsset": toNumber(data.totalAsset),
        "ktpno": data.icNumber,
        "pob": data.placeOfBirth,
        "religionID": data.religionID,
        "workingExperience": data.workingExperience,
        "homeOwnership": data.homeOwnership,
        "selfie": data.selfie,
        "icImg": data.icImg
      }

      if (supplementaryServiceID) {
        params.serviceSubscription = [{ supplementaryServiceID }];
      }

      return api
        .post(`/REST-LMSCore/services/lms/submitApplication?transID=${props.state.generalStates.transID}`, params)
        .then(res => {
          if (res.data.result === "Application update successful") {
            props.dispatch({ type: IS_LOADING, data: false });
            props.dispatch({ type: SET_GENERAL_DATA, data: { contractPreview: res.data.contractPreview } });
            props.dispatch({ type: NEXT_STEP });
            // api.post("url mas ias").
            // then(api.get(contractkey==))
          }
        })
        .catch(error => {
          props.dispatch({ type: IS_LOADING, data: false });
          Sentry.captureMessage(error);
          props.dispatch({
            type: SET_ERROR,
            data: error,
          });
        });
    },
    submitPreauthorizedApplication: (data) => {

      const selectedDuration = _.find(props.state.generalStates.financingOption, { 'tenure': data.duration });

      if (!_.isEmpty(selectedDuration)) {
        props.dispatch({ type: IS_LOADING, data: true });
        return api
          .post(`/REST-LMSCore/services/lms/submitPreauthorizedApplication?transID=${props.state.generalStates.transID}`, {
            "sessionKey": props.state.generalStates.sessionKey,
            "totalLoan": toNumber(data.financingAmount),
            // "loanDuration": selectedDuration.tenure,
            "loanDuration": data.duration,
            "timeUnit": selectedDuration.timeUnit,
            "preauthToken": props.state.generalStates.preAuthToken
          }).then(res => {
            if (res.data.result === "Application update successful") {
              props.dispatch({ type: IS_LOADING, data: false });
              props.dispatch({ type: SET_GENERAL_DATA, data: { contractPreview: res.data.contractPreview } });
              props.dispatch({ type: SET_STEP, data: 3 });
            }
          }).catch(error => {
            props.dispatch({ type: IS_LOADING, data: false });
            Sentry.captureMessage(error);
            props.dispatch({
              type: SET_ERROR,
              data: error,
            });
          });
      } else {
        props.dispatch({
          type: SET_VERIFY_CODE_FAILURE_DIALOG, data: {
            dialog: {
              dialogTitle: "Invalid Action",
              dialogContent: "Please try again later."
            },
            show: true
          }
        })
      }
    },
  }
}

