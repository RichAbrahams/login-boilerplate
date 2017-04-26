/*
 *
 * SendReset
 *
 */

import React, { PropTypes } from 'react';
import { Row, Col, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import SendResetForm from 'components/SendResetForm';
import { createStructuredSelector } from 'reselect';
import makeSelectSendReset from './selectors';
import * as actions from './actions';
import * as selectors from './selectors';

export class SendReset extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillUnmount() {
    this.props.resetState();
  }

  handleSubmit(payload) {
    return new Promise((resolve, reject) => {
      this
        .props
        .submitPasswordResetUsername({ data: payload, resolve, reject });
    });
  }

  render() {
    return (
      <Row>
        <Helmet
          title="Send Password Reset"
          meta={[{
            name: 'Send Password Reset',
            content: 'Send Password Reset',
          },
          ]}
        />
        <Col xs={10} sm={8} md={6} xsOffset={1} smOffset={2} mdOffset={3}>
          <h1>Reset Password</h1>
          <Well bsSize="large">
            {!this.props.emailSent && <SendResetForm {...this.props} onSubmit={(payload) => this.handleSubmit(payload)} />}
            {this.props.emailSent && <h3>An email was sent to your registered email address containing password reset instructions.</h3>}
          </Well>
        </Col>
      </Row>
    );
  }
}

SendReset.propTypes = {
  submitPasswordResetUsername: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  emailSent: selectors.selectEmailSent(),
});

function mapDispatchToProps(dispatch) {
  return {
    submitPasswordResetUsername: (payload) => dispatch(actions.submitPasswordResetUsername(payload)),
    resetState: () => dispatch(actions.resetState()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendReset);
