import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { SubmissionError } from 'redux-form/immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SIGN_UP } from './constants';
import { signUpSuccess } from './actions';

export function* getSignUp(action) {
  const { data, resolve, reject } = action.payload;
  console.log('saga', data.toJS());
  try {
    const requestURL = '/api/signup';
    const response = yield axios.post(requestURL, data.toJS());
    console.log('response', response);
    yield put(signUpSuccess(response.data));
    yield resolve();
    yield browserHistory.push('/');
  } catch (err) {
    yield console.log('saga error', err);
    reject(new SubmissionError({ _error: 'username or password already in use' }));
  }
}

export function* signUpWatcher() {
  const watcher = yield takeLatest(SIGN_UP, getSignUp);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  signUpWatcher,
];
