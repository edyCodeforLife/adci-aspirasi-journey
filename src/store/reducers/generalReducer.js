import {
  IS_LOADING,
  SET_CODE,
  SET_ERROR,
  SET_REQUEST_OTP_STATUS,
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

export const generalStates = {
  isInsuranceProduct: false,
  allowFlexibleAmount: false,
  skipAutorepaymentEnrolment: false,
  merchant: {
    id: 0,
    customerUUID: null,
    businessID: 0,
    distributorID: 0,
    name: null,
    email: null,
    identifier: 0,
    customData: null,
    identifierType: 0,
    secondaryIdentifier: null,
    maxAmount: 0,
    productEntitlement: 0,
    nativeCurrency: 0,
    bankAccountNumber: null,
    bankID: 0,
    limitExpiry: null,
    msisdn: null,
    skipAutoPaymentEnrolment: 0,
    applicationID: 0,
    merchantUUID: null
  },
  product: {
    id: 0,
    name: null,
    code: null,
    type: 0,
    time_unit: 0,
    min_term: 0,
    max_term: 0,
    denomGap: 0,
    minimumDenom: 0,
    interestRate: 0,
    interestCalculationMethod: 0,
    multiLoanSetting: 0,
    loanPlanCalculator: null,
    repaymentStartGap: 0
  },
  allowedDenom: [],
  sessionKey: null,
  ipAddress: null,
  financingOption: [],
  preAuthToken: null,
  business: {
    id: 0,
    uuid: null,
    business_name: null,
    business_category: 0,
    brand_name: null,
    address1: null,
    address2: null,
    address3: null,
    postcode: null,
    state: null,
    country: null,
    type: 0,
    registration_number: null,
    registration_date: null,
    email: null,
    msisdn: null,
    account_number: null,
    bankID: 0
  },
  distributor: {
    id: 0,
    name: null,
    code: null,
    recordCreateDate: null,
    status: 0,
    fundSource: 0,
    disbursementGateway: 0,
    repaymentMethod: 0,
    docBase: null,
    sendContract: 0,
    distributorPlugin: null
  },
  customer: {
    cust_id: 0,
    id: null,
    name: null,
    dob: null,
    id_number: 0,
    id_type: 0,
    country_id: null,
    marital_status: null,
    primary_contact: 0,
    secondary_contact: 0,
    address1: null,
    address2: null,
    address3: null,
    postcode: null,
    state: null,
    country: null,
    gender: null,
    record_create_date: null,
    record_update_date: null,
    nationality: null,
    email: null,
    birthplace: null,
  },
  isLoading: false,
  isVerifyCodeFailureDialogShow: false,
  submittedOTPRequest: false,
  error: null,
  transID: '',
  code: '',
  reference: '',
  encodeBk: '',
  step: 0,
  contractPreview: null,
  dialog: {
    dialogTitle: "",
    dialogContent: ""
  }
}

export const generalReducer = (state, action) => {
  switch (action.type) {
    case SET_VERIFY_CODE_FAILURE_DIALOG:
      const content = { isVerifyCodeFailureDialogShow: action.data.show }
      if (action.data.dialog) content.dialog = action.data.dialog
      return {
        ...state,
        ...content
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.data,
      };
    case SET_CODE:
      return {
        ...state,
        code: action.data,
      };
    case SET_REQUEST_OTP_STATUS:
      return {
        ...state,
        submittedOTPRequest: action.data,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.data,
      };
    case NEXT_STEP:
      return {
        ...state,
        step: state.step + 1
      };
    case PREVIOUS_STEP:
      return {
        ...state,
        step: state.step - 1
      };
    case RESET_STEP:
      return {
        ...state,
        step: 0
      };
    case SET_STEP:
      return {
        ...state,
        step: action.data
      };
    case SET_GENERAL_DATA:
      return {
        ...state,
        ...action.data
      };
    case SET_REFERENCE_IMG:
      return {
        ...state,
        reference: action.data
      };
    case SET_ENCODE_URI_BK:
      return {
        ...state,
        encodeBk: action.data
      };
    case RESET_GENERAL_DATA:
      return {
        ...generalStates
      };
    default: return state
  }
}