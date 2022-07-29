import { initialState } from '../state/initialStates';
import { financialReducer } from './financialReducer';
import { generalReducer } from './generalReducer';
import { businessReducer } from './businessReducer';
import { personalReducer } from './personalReducer';
import { aspirasiReducer } from './aspirasiReducer';

const reducer = (state = initialState, action) => {
  return {
    financialStates: financialReducer(state.financialStates, action),
    generalStates: generalReducer(state.generalStates,action),
    businessStates: businessReducer(state.businessStates,action),
    aspirasiStates: aspirasiReducer(state.aspirasiStates, action),
    personalStates: personalReducer(state.personalStates,action),
  }
};

export { initialState, reducer };