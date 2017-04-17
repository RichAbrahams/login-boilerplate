/*
 *
 * SignUp
 *
 */

import React, { PropTypes } from 'react';
import { Row, Col, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import SignUpForm from 'components/SignUpForm';
import * as actions from './actions';

export class SignUp extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  handleSubmit(payload) {
    return new Promise((resolve, reject) => {
      this
        .props
        .signUp({ data: payload, resolve, reject });
    });
  }

  render() {
    return (
      <Row>
        <Helmet
          title="Sign up"
          meta={[{
            name: 'Sign up',
            content: 'Sign up',
          },
          ]}
        />
        <Col xs={10} sm={8} md={6} xsOffset={1} smOffset={2} mdOffset={3}>
          <h1>Sign Up</h1>
          <Well bsSize="large">
            <SignUpForm {...this.props} onSubmit={(payload) => this.handleSubmit(payload)} />
          </Well>
        </Col>
      </Row>
    );
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    signUp: (payload) => dispatch(actions.signUp(payload)),
  };
}

export default connect(null, mapDispatchToProps)(SignUp);
