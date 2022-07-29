import { generalActions } from './generalActions'
import { financialActions } from './financialActions'
import { businessActions } from './businessActions'
import { personalActions } from './personalActions'
import {aspirasiActions} from './aspirasiActions'

export const useActions = (state, dispatch) => {
  return {
    generalActions: generalActions({state, dispatch}),
    financialActions: financialActions({state, dispatch}),
    businessActions: businessActions({state, dispatch}),
    personalActions: personalActions({state, dispatch}),
    aspirasiActions: aspirasiActions({state, dispatch}),
  }
};