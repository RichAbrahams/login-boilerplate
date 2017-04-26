import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { SubmissionError } from 'redux-form/immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SUBMIT_PASSWORD_RESET_USERNAME } from './constants';
import { submitPasswordResetUsernameSuccess } from './actions';

export function* sendResetEmail(action) {
  const { data, resolve, reject } = action.payload;
  try {
    const requestURL = '/api/sendresetemail';
    const response = yield axios.post(requestURL, data.toJS());
    yield resolve();
    yield put(submitPasswordResetUsernameSuccess());
  } catch (err) {
    reject(new SubmissionError({ _error: 'username not registered' }));
  }
}

export function* sendResetEmailWatcher() {
  const watcher = yield takeLatest(SUBMIT_PASSWORD_RESET_USERNAME, sendResetEmail);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  sendResetEmailWatcher,
];
