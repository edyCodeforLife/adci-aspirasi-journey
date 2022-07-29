import {
  SET_BUSINESS_FORM_DATA,
  SET_STORE_IMAGE_URL,
  SET_SSM_IMAGE_URL,
  RESET_BUSINESS_FORM_DATA
} from "../types";
  
export const businessStates = {
  monthlyIncome: "",
  totalOutlet: "",
  storeImg: "",
  ssmImg: "",
}
  
export const businessReducer = (state, action) => {
  switch (action.type) {
    case SET_BUSINESS_FORM_DATA:
      return {
        ...state,
        ...action.data
      };
    case SET_STORE_IMAGE_URL:
      return {
        ...state,
        storeImg: action.data
      };
    case SET_SSM_IMAGE_URL:
      return {
        ...state,
        ssmImg: action.data
      };
    case RESET_BUSINESS_FORM_DATA:
      return {
        ...businessStates
      };
    default: return state
  }
};