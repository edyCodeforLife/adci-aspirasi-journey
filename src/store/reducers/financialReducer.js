import {
  SET_FINANCING_FORM_DATA,
  SET_FINANCING_AMOUNT,
  SET_DURATION,
  SET_AGREEMENT_1,
  SET_AGREEMENT_2,
  SET_AGREEMENT_3,
  RESET_FINANCING_FORM_DATA
} from "../types";
  
export const financialStates = {
  financingAmount: "",
  duration: 0,
  agreementJuro: false,
  agreementAspirasi: false,
  agreement1: false,
  agreement2: false,
  agreement3: false,
  repayment: {
    tenure: 0,
    principal: 0,
    totalLoanAmount: 0,
    totalRepaymentAmount: 0,
    netFinancingAmount: 0,
    serviceFee: 0,
    totalInterest: 0,
    monthlyInterestPercentage: 0.0,
    serviceFeePercentage: 0.0,
    agentFees: 0,
    totalFinancing: 0,
    insurancePremium: 0,
  },
}
  
export const financialReducer = (state, action) => {
  switch (action.type) {
    case SET_FINANCING_FORM_DATA:
      return {
        ...state,
        ...action.data
      };
    case RESET_FINANCING_FORM_DATA:
      return {
        ...financialStates
      }; 
    case SET_FINANCING_AMOUNT:
      return {
        ...state,
        financingAmount: action.data
      };
    case SET_DURATION:
      return {
        ...state,
        duration: action.data
      };
    case SET_AGREEMENT_1:
      return {
        ...state,
        agreement1: action.data
      };
    case SET_AGREEMENT_2:
      return {
        ...state,
        agreement2: action.data
      };
    case SET_AGREEMENT_3:
      return {
        ...state,
        agreement3: action.data
      };
    default: return state;
  }
};