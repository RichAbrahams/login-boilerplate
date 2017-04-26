import { take, put, call, cancel, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { SubmissionError } from 'redux-form/immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SIGN_IN } from './constants';
import { signInSuccess } from './actions';

function setAuthToken(data) {
  const token = data.token;
  localStorage.setItem('token', JSON.stringify(token));
}

export function* getSignIn(action) {
  const { data, resolve, reject } = action.payload;
  try {
    const requestURL = '/api/signin';
    const response = yield axios.post(requestURL, data.toJS());
    yield call(setAuthToken, response.data.user);
    yield put(signInSuccess(response.data.user));
    yield resolve();
    yield browserHistory.push('/');
  } catch (err) {
    reject(new SubmissionError({ _error: 'email or password incorrect' }));
  }
}

export function* signInWatcher() {
  const watcher = yield takeLatest(SIGN_IN, getSignIn);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  signInWatcher,
];
