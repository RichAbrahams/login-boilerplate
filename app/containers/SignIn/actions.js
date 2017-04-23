import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  RETRIEVE_USER,
} from './constants';

export function signIn(payload) {
  return {
    type: SIGN_IN,
    payload,
  };
}

export function signInSuccess(payload) {
  return {
    type: SIGN_IN_SUCCESS,
    payload,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}


