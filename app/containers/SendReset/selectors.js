import { createSelector } from 'reselect';

const selectSendResetDomain = () => (state) => state.get('sendReset');

const selectEmailSent = () => createSelector(
  selectSendResetDomain(),
  (substate) => substate.get('emailSent')
);

export {
  selectEmailSent,
};
