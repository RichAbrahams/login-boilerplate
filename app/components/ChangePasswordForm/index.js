/**
*
* ChangePasswordForm
*
*/
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button, ButtonToolbar, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

const validate = (values) => {
  const errors = {};
  if (!values.get('oldpassword')) {
    errors.oldpassword = 'Required';
  }
  if (!values.get('newpassword')) {
    errors.newpassword = 'Required';
  }
  if (!values.get('confirm')) {
    errors.confirm = 'Required';
  }
  if (values.get('newpassword') !== values.get('confirm')) {
    errors.newpassword = 'Passwords do not match';
    errors.confirm = 'Passwords do not match';
  }
  return errors;
};

const renderTextField = ({ input, label, type, meta: { touched, error }, placeholder }) => {
  return (
    <FormGroup controlId={input.name}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl type={type} placeholder={placeholder} value={input.value} onChange={input.onChange} />
      {touched && error && <span className="text-danger">{error}</span>}
    </FormGroup>
  );
};

function ChangePasswordForm({ error, handleSubmit, pristine, reset, submitting}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="oldpassword" component={renderTextField} label="Current password" placeholder="Old password" type="password" />
      <Field name="newpassword" component={renderTextField} label="New password" placeholder="New password" type="password" />
      <Field name="confirm" component={renderTextField} label="Confirm new password" placeholder="Confirm" type="password" />
      <div>
        <ButtonToolbar>
          <Button bsStyle="primary" type="submit" disabled={submitting}>Update</Button>
        </ButtonToolbar>
      </div>
      {error && <span className="text-danger">{error}</span>}
    </form>
  );
}

ChangePasswordForm.propTypes = {

};

export default reduxForm({
  form: 'ChangePassword',
  validate,
})(ChangePasswordForm);
