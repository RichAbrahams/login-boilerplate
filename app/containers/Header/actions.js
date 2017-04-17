/*
 *
 * Header actions
 *
 */
import {
  SIGN_IN_SUCCESS,
} from './constants';

export function signInSuccess(payload) {
  return {
    type: SIGN_IN_SUCCESS,
    payload,
  };
}
