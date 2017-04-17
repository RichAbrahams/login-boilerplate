import { createSelector } from 'reselect';

const selectHeaderDomain = () => (state) => state.get('header');

const username = () => createSelector(
  selectHeaderDomain(),
  (substate) => substate.get('username')
);

export {
  username,
};
