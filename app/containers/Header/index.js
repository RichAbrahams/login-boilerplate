import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Navbar, Nav, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Banner from './banner.jpg';
import Image from './Image';
import ImageWrapper from './ImageWrapper';
import * as selectors from './selectors';

export class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  handleSelect(selectedKey) {
    browserHistory.push(selectedKey);
  }

  render() {
    return (
      <Row>
        <Navbar>
          <Nav onSelect={this.handleSelect} pullRight>
            { !this.props.username && <NavItem eventKey="/signin">Sign In</NavItem>}
            { !this.props.username && <NavItem eventKey="/signup">Sign Up</NavItem>}
            { this.props.username && <NavItem eventKey="/signout">Welcome {this.props.username} - Sign Out</NavItem>}
          </Nav>
        </Navbar>
      </Row>
    );
  }
}

Header.propTypes = {
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  username: selectors.username(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
