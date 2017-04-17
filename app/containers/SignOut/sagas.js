import { take, call } from 'redux-saga/effects';
import { SIGN_OUT } from '../SignOut/constants';

function removeAuthToken() {
  localStorage.removeItem('authToken');
}

export function* signOut(action) {
  while (true) {
    yield take(SIGN_OUT);
    yield call(removeAuthToken);
  }
}

export default [
  signOut,
];
