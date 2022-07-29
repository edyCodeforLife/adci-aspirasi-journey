import {
  SET_MERCHANT_DISTRIBUTOR_LIST
} from "../types";
  
export const aspirasiStates = {
  access_token: "",
  token_type: "",
  expires_in: "",
  merchantName: "",
  merchantPhone: "",
  merchantEmail: "",
  merchantIdentifier: null,
  distributorDetails: [
    {
      "merchantId": 0,
      "merchantLimit": 0,
      "distributorId": 0,
      "merchantIdentity": "",
      "distributorName": "",
      "interestRate": ""
    }],
  contractDetailList: [
      {
        "id": 0,
        "principalAmount": 0,
        "remainingAmount": 0,
        "contractDueDate": ""
      }],
  // virtualAccount:[
  //   {
  //     virtualAccount: 0,
  //     bankName: undefined
  //   }
  // ]
}
  
export const aspirasiReducer  = (state, action) => {
  switch (action.type) {
    case SET_MERCHANT_DISTRIBUTOR_LIST:
      return {
        ...state,
        ...action.data
      };
    default: return state
  }
};