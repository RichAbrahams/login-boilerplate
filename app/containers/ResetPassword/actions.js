/*
 *
 * ResetPassword actions
 *
 */

import {
  SUBMIT_NEW_PASSWORD,
  SUBMIT_NEW_PASSWORD_SUCCESS,
} from './constants';

export function submitNewPassword(payload) {
  return {
    type: SUBMIT_NEW_PASSWORD,
    payload,
  };
}

export function submitNewPasswordSuccess() {
  return {
    type: SUBMIT_NEW_PASSWORD_SUCCESS,
  };
}
