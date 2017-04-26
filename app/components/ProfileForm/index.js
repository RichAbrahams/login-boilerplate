/**
*
* ProfileForm
*
*/

import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button, ButtonToolbar, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

const validate = (values) => {
  const errors = {};
  if (!values.get('email')) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Invalid email address';
  }
  if (!values.get('city')) {
    errors.city = 'Required';
  }
  if (!values.get('email')) {
    errors.state = 'Required';
  }
  return errors;
};

const renderTextField = ({ input, label, type, meta: { touched, error }, placeholder, disabled }) => {
  return (
    <FormGroup controlId={input.name}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl type={type} placeholder={placeholder} value={input.value} onChange={input.onChange} disabled={disabled} />
      {touched && error && <span className="text-danger">{error}</span>}
    </FormGroup>
  );
};

function ProfileForm({ error, handleSubmit, pristine, reset, submitting}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" component={renderTextField} label="Username" placeholder="Enter username" type="text" disabled />
      <Field name="email" component={renderTextField} label="Email" placeholder="Enter email" type="text" />
      <Field name="city" component={renderTextField} label="City" placeholder="Enter city" type="text" />
      <Field name="state" component={renderTextField} label="State" placeholder="Enter state" type="text" />
      <div>
        <ButtonToolbar>
          <Button bsStyle="primary" type="submit" disabled={submitting}>Update</Button>
        </ButtonToolbar>
      </div>
      {error && <span className="text-danger">{error}</span>}
    </form>
  );
}

ProfileForm.propTypes = {

};

ProfileForm = reduxForm({
  form: 'EditNewOrder',
  validate,
})(ProfileForm);

ProfileForm = connect(state => ({
  initialValues: state.get('header').toJS(),
}))(ProfileForm);

export default ProfileForm;
