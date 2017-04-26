import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { SubmissionError } from 'redux-form/immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SUBMIT_NEW_PASSWORD } from './constants';
import { submitNewPasswordSuccess } from './actions';

export function* resetPassword(action) {
  const { token, data, resolve, reject } = action.payload;
  try {
    const config = { headers: { authorization: token } };
    const requestURL = '/api/resetpassword';
    yield axios.post(requestURL, data.toJS(), config);
    yield resolve();
    yield put(submitNewPasswordSuccess());
  } catch (err) {
    console.log(err);
    reject(new SubmissionError({ _error: 'link timed out' }));
  }
}

export function* resetPasswordWatcher() {
  const watcher = yield takeLatest(SUBMIT_NEW_PASSWORD, resetPassword);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  resetPasswordWatcher,
];
