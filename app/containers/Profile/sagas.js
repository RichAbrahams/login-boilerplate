import { take, put, cancel, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import { SubmissionError } from 'redux-form/immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { UPDATE_PASSWORD, UPDATE_PROFILE } from './constants';
import { selectToken } from '../Header/selectors';
import { signUpSuccess } from '../SignUp/actions';

export function* getUpdateProfile(action) {
  const { data, resolve, reject } = action.payload;
  try {
    const token = yield select(selectToken());
    const requestURL = '/api/updateprofile';
    const config = { headers: { authorization: token } };
    const response = yield axios.post(requestURL, data.toJS(), config);
    yield put(signUpSuccess(response.data));
    yield resolve();
  } catch (err) {
    reject(new SubmissionError({ _error: 'username or email incorrect' }));
  }
}

export function* updateProfileWatcher() {
  const watcher = yield takeLatest(UPDATE_PROFILE, getUpdateProfile);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getUpdatePassword(action) {
  const { data, resolve, reject } = action.payload;
  try {
    const token = yield select(selectToken());
    const requestURL = '/api/updatepassword';
    const config = { headers: { authorization: token } };
    yield axios.post(requestURL, data.toJS(), config);
    yield resolve();
  } catch (err) {
    reject(new SubmissionError({ _error: 'password incorrect' }));
  }
}

export function* updatePasswordWatcher() {
  const watcher = yield takeLatest(UPDATE_PASSWORD, getUpdatePassword);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  updateProfileWatcher,
  updatePasswordWatcher,
];
