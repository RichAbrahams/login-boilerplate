/**
*
* SignUpForm
*
*/
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button, ButtonToolbar, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

const validate = (values) => {
  const errors = {};
  if (!values.get('username')) {
    errors.username = 'Required';
  }
  if (!values.get('city')) {
    errors.city = 'Required';
  }
  if (!values.get('state')) {
    errors.state = 'Required';
  }
  if (!values.get('password')) {
    errors.password = 'Required';
  }
  if (!values.get('confirm')) {
    errors.confirm = 'Required';
  }
  if (values.get('confirm') !== values.get('password')) {
    errors.confirm = 'Passwords do not match';
    errors.password = 'Passwords do not match';
  }
  if (!values.get('email')) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Invalid email address';
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

function SignUpForm({ error, handleSubmit, pristine, reset, submitting}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" component={renderTextField} label="Username" placeholder="Enter username" type="text" />
      <Field name="email" component={renderTextField} label="Email" placeholder="Enter email" type="text" />
      <Field name="city" component={renderTextField} label="City" placeholder="Enter city" type="text" />
      <Field name="state" component={renderTextField} label="State" placeholder="Enter state" type="text" />
      <Field name="password" component={renderTextField} label="Password" placeholder="Enter password" type="password" />
      <Field name="confirm" component={renderTextField} label="Confirm Password" placeholder="Enter password" type="password" />
      <div>
        <ButtonToolbar>
          <Button bsStyle="primary" type="submit" disabled={submitting}>Submit</Button>
        </ButtonToolbar>
      </div>
      {error && <span className="text-danger">{error}</span>}
    </form>
  );
}

SignUpForm.propTypes = {};

export default reduxForm({
  form: 'SignUp', // a unique identifier for this form
  validate,
})(SignUpForm);
