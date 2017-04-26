/*
 *
 * SendReset reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SUBMIT_PASSWORD_RESET_USERNAME_SUCCESS,
  RESET_STATE,
} from './constants';

const initialState = fromJS({
  emailSent: false,
});

function sendResetReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_PASSWORD_RESET_USERNAME_SUCCESS:
      return state.set('emailSent', true);
    case RESET_STATE:
      return state.set('emailSent', false);
    default:
      return state;
  }
}

export default sendResetReducer;
