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

const initialState = fromJS({});

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      console.log(action.payload);
      return state.merge(action.payload);
    case SIGN_UP_SUCCESS:
      return state.merge(action.payload);
    case SIGN_OUT:
      return fromJS({});
    default:
      return state;
  }
}

export default headerReducer;
