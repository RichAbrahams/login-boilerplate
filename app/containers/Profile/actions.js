/*
 *
 * Profile actions
 *
 */

import {
  UPDATE_PROFILE,
  UPDATE_PASSWORD,
} from './constants';

export function updateProfile(payload) {
  return {
    type: UPDATE_PROFILE,
    payload,
  };
}

export function updatePassword(payload) {
  return {
    type: UPDATE_PASSWORD,
    payload,
  };
}
