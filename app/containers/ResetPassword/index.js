/*
 *
 * ResetPassword
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Well } from 'react-bootstrap';
import { Link } from 'react-router';
import ResetPasswordForm from 'components/ResetPasswordForm';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import * as selectors from './selectors';
import * as actions from './actions';

export class ResetPassword extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  handleSubmit(payload) {
    return new Promise((resolve, reject) => {
      this
        .props
        .submitNewPassword({ token: this.props.location.query.token, data: payload, resolve, reject });
    });
  }

  render() {
    return (
      <Row>
        <Helmet
          title="Reset Password"
          meta={[{
            name: 'Reset Password',
            content: 'Reset Password',
          },
          ]}
        />
        <Col xs={10} sm={8} md={6} xsOffset={1} smOffset={2} mdOffset={3}>
          <h1>Reset Password</h1>
          <Well bsSize="large">
            {!this.props.submitSuccess && <ResetPasswordForm {...this.props} onSubmit={(payload) => this.handleSubmit(payload)} />}
            {this.props.submitSuccess && <h3>Your password has been reset.</h3>}
            {this.props.submitSuccess && <p><Link to="/signin">Sign In</Link></p>}
          </Well>
        </Col>
      </Row>
    );
  }
}

ResetPassword.propTypes = {
  submitNewPassword: React.PropTypes.func,
  submitSuccess: React.PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  submitSuccess: selectors.selectSubmitSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    submitNewPassword: (payload) => dispatch(actions.submitNewPassword(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
