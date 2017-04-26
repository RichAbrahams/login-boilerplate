/**
*
* SendResetForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button, ButtonToolbar, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

const renderTextField = ({ input, label, type, meta: { touched, error }, placeholder }) => {
  return (
    <FormGroup controlId={input.name}>
      <FormControl type={type} placeholder={placeholder} value={input.value} onChange={input.onChange} />
      {touched && error && <span className="text-danger">{error}</span>}
    </FormGroup>
  );
};

function SendResetForm({ error, handleSubmit, pristine, reset, submitting}) {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Please enter your username, we will email you a password reset link</h3>
      <Field name="username" component={renderTextField} label="Username" placeholder="username" type="text" />
      <div>
        <ButtonToolbar>
          <Button bsStyle="primary" type="submit" disabled={submitting}>Send Email</Button>
        </ButtonToolbar>
      </div>
      {error && <span className="text-danger">{error}</span>}
    </form>
  );
}

SendResetForm.propTypes = {

};

export default reduxForm({
  form: 'SendReset',
})(SendResetForm);
