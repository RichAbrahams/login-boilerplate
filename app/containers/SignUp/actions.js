/*
 *
 * SignUp actions
 *
 */

import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
} from './constants';

export function signUp(payload) {
  return {
    type: SIGN_UP,
    payload,
  };
}

export function signUpSuccess(payload) {
  console.log('signUpSuccess');
  return {
    type: SIGN_UP_SUCCESS,
    payload,
  };
}
