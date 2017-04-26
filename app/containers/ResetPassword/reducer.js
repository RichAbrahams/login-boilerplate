/*
 *
 * ResetPassword reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SUBMIT_NEW_PASSWORD_SUCCESS,
} from './constants';

const initialState = fromJS({
  submitSuccess: null,
});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_NEW_PASSWORD_SUCCESS:
      return state.set('submitSuccess', true);
    default:
      return state;
  }
}

export default resetPasswordReducer;
