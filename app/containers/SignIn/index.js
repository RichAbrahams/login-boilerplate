/*
 *
 * SignIn
 *
 */

import React, {PropTypes} from 'react';
import { Row, Col, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import SignInForm from 'components/SignInForm';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import P from './P';
import { Link } from 'react-router';

export class SignIn extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  handleSubmit(payload) {
    return new Promise((resolve, reject) => {
      this
        .props
        .signIn({data: payload, resolve, reject});
    });
  }

  render() {
    return (
      <Row>
        <Helmet
          title="Sign In"
          meta={[{
            name: 'sign in',
            content: 'sign in',
          },
          ]}
        />
        <Col xs={10} sm={8} md={6} xsOffset={1} smOffset={2} mdOffset={3}>
          <h1>Sign In</h1>
          <Well bsSize="large">
            <SignInForm {...this.props} onSubmit={(payload) => this.handleSubmit(payload)}/>
          </Well>
          <P><Link to="/signup">Need an account?</Link></P>
        </Col>
      </Row>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
};


function mapDispatchToProps(dispatch) {
  return {
    signIn: (payload) => dispatch(actions.signIn(payload)),
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
