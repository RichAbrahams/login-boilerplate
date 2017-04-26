/**
*
* ResetPasswordForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button, ButtonToolbar, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

const validate = (values) => {
  const errors = {};
  if (!values.get('password')) {
    errors.password = 'Required';
  }
  if (!values.get('confirm')) {
    errors.confirm = 'Required';
  }
  if (values.get('password') !== values.get('confirm')) {
    errors.password = 'Passwords do not match';
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

function ResetPasswordForm({ error, handleSubmit, pristine, reset, submitting}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="password" component={renderTextField} label="New Password" placeholder="Enter password" type="password" />
      <Field name="confirm" component={renderTextField} label="Confirm New Password" placeholder="Enter password" type="password" />
      <div>
        <ButtonToolbar>
          <Button bsStyle="primary" type="submit" disabled={submitting}>Submit</Button>
        </ButtonToolbar>
      </div>
      {error && <span className="text-danger">{error}</span>}
    </form>
  );
}

ResetPasswordForm.propTypes = {};

export default reduxForm({
  form: 'ResetPassword',
  validate,
})(ResetPasswordForm);
