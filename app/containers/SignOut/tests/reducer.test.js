
import { fromJS } from 'immutable';
import signOutReducer from '../reducer';

describe('signOutReducer', () => {
  it('returns the initial state', () => {
    expect(signOutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
