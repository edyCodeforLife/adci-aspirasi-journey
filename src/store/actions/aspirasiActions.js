import {
    SET_MERCHANT_DISTRIBUTOR_LIST
  } from "../types";
  
  export const aspirasiActions = (props) => {
    return {
      setMerchantDistributorList: (data) => {
        props.dispatch({type: SET_MERCHANT_DISTRIBUTOR_LIST, data});
      }
    }
  }