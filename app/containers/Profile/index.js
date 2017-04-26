/*
 *
 * Profile
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Well } from 'react-bootstrap';
import Helmet from 'react-helmet';
import ProfileForm from 'components/ProfileForm';
import ChangePasswordForm from 'components/ChangePasswordForm';
import toastr from 'toastr';
import * as actions from './actions';
import makeSelectProfile from './selectors';

export class Profile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  handleProfileSubmit(payload) {
    return new Promise((resolve, reject) => {
      this
        .props
        .updateProfile({ data: payload, resolve, reject });
    }).then(() => {
      toastr.options = {
        positionClass: 'toast-bottom-full-width',
        showDuration: '3000',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut',
      };
      toastr.success('profile updated');
    });
  }

  handlePasswordSubmit(payload) {
    return new Promise((resolve, reject) => {
      this
        .props
        .updatePassword({ data: payload, resolve, reject });
    }).then(() => {
      toastr.options = {
        positionClass: 'toast-bottom-full-width',
        showDuration: '3000',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut',
      };
      toastr.success('password updated');
    });
  }

  render() {
    return (
      <Row>
        <Helmet
          title="Profile"
          meta={[{
            name: 'Profile',
            content: 'Profile',
          },
          ]}
        />
        <Col xs={10} sm={8} md={6} xsOffset={1} smOffset={2} mdOffset={3}>
          <h1>Profile</h1>
          <Well bsSize="large">
            <ProfileForm {...this.props} onSubmit={(payload) => this.handleProfileSubmit(payload)} />
          </Well>
          <h1>Change Password</h1>
          <Well bsSize="large">
            <ChangePasswordForm {...this.props} onSubmit={(payload) => this.handlePasswordSubmit(payload)} />
          </Well>
        </Col>
      </Row>
    );
  }
}

Profile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateProfile: (payload) => dispatch(actions.updateProfile(payload)),
    updatePassword: (payload) => dispatch(actions.updatePassword(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
