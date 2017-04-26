import { createSelector } from 'reselect';

const selectResetPasswordDomain = () => (state) => state.get('resetPassword');

const selectSubmitSuccess = () => createSelector(
  selectResetPasswordDomain(),
  (substate) => substate.get('submitSuccess')
);

export {
  selectSubmitSuccess,
};
