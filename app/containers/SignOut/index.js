/*
 *
 * SignOut
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';
import * as actions from './actions';

export class SignOut extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return (
      <Row>
        <Helmet
          title="SignOut"
          meta={[
            { name: 'description', content: 'Description of SignOut' },
          ]}
        />
        <Col xs={12}>
          <h1 className="text-center">Signed Out</h1>
          <p className="text-center"><Link to="/signin">Sign back in</Link></p>
        </Col>
      </Row>
    );
  }
}

SignOut.propTypes = {
  signOut: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(actions.signOut()),
  };
}

export default connect(null, mapDispatchToProps)(SignOut);
