/*
 *
 * SendReset actions
 *
 */

import {
  SUBMIT_PASSWORD_RESET_USERNAME,
  SUBMIT_PASSWORD_RESET_USERNAME_SUCCESS,
  RESET_STATE,
} from './constants';

export function submitPasswordResetUsername(payload) {
  return {
    type: SUBMIT_PASSWORD_RESET_USERNAME,
    payload,
  };
}

export function submitPasswordResetUsernameSuccess() {
  return {
    type: SUBMIT_PASSWORD_RESET_USERNAME_SUCCESS,
  };
}

export function resetState() {
  return {
    type: RESET_STATE,
  };
}
