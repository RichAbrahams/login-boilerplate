
import { fromJS } from 'immutable';
import sendResetReducer from '../reducer';

describe('sendResetReducer', () => {
  it('returns the initial state', () => {
    expect(sendResetReducer(undefined, {})).toEqual(fromJS({}));
  });
});
