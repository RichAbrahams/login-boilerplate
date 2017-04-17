/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SIGN_IN_SUCCESS,
} from '../SignIn/constants';

import {
  SIGN_UP_SUCCESS,
} from '../SignUp/constants';

import {
  SIGN_OUT,
} from '../SignOut/constants';

const initialState = fromJS({
  username: null,
  token: null,
});

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return state.set('username', action.payload.username).set('token', action.payload.token);
    case SIGN_UP_SUCCESS:
      return state.set('username', action.payload.username).set('token', action.payload.token);
    case SIGN_OUT:
      return state.set('username', null).set('token', null);
    default:
      return state;
  }
}

export default headerReducer;
