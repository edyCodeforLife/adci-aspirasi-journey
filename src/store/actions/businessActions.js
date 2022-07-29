import {
  SET_BUSINESS_FORM_DATA,
  SET_STORE_IMAGE_URL,
  SET_SSM_IMAGE_URL,
  RESET_BUSINESS_FORM_DATA
} from "../types";

export const businessActions = (props) => {
  return {
    setBusinessFormData: (data) => {
      props.dispatch({type: SET_BUSINESS_FORM_DATA, data});
    },
    resetBusinessData: () =>{
      props.dispatch({ type: RESET_BUSINESS_FORM_DATA });
    },
    setStoreImg: (data) => {
      props.dispatch({type: SET_STORE_IMAGE_URL, data});
    },
    setSSMImg: (data) => {
      props.dispatch({type: SET_SSM_IMAGE_URL, data});
    },
  }
}