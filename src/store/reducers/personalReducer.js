import {
  SET_PERSONAL_FORM_DATA,
  SET_SELFIE,
  SET_IC_IMG,
  RESET_PERSONAL_FORM_DATA
} from "../types";

export const personalStates = {
  gender: "",
  maritalStatus: "",
  educationLevel: "",
  numberOfChild: "",
  jobType: "",
  totalAsset: "",
  icNumber: "",
  placeOfBirth: "",
  religionID: "",
  workingExperience: "",
  homeOwnership: "",
  selfie: "",
  icImg: "",
}

export const personalReducer = (state, action) => {
  switch (action.type) {
    case SET_PERSONAL_FORM_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SET_SELFIE:
      return {
        ...state,
        selfie: action.data
      };
    case SET_IC_IMG:
      return {
        ...state,
        icImg: action.data
      };
    case RESET_PERSONAL_FORM_DATA:
      return {
        ...personalStates
      };
    default: return state
  }
};