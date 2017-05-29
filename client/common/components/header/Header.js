import React from 'react';
import PropTypes from 'prop-types';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import logout from '../../../common/logout';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();

    console.log(this.props.viewer);
    logout(this.props.viewer.user || {},
      {
        onFailure: (transaction) => {
          console.log('onFailure');
          console.log(transaction.getError());
        },
        onSuccess: () => browserHistory.push('/')
      }
    );
  }

  handleLogin(event) {
    event.preventDefault();
    browserHistory.push('login');
  }

  render() {
    return (<Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a>Pivotal-Tomato</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>

          <NavItem
            eventKey={1}
            onClick={this.handleLogin}
          >
            Login
           </NavItem>
          <NavItem
            eventKey={2}
            onClick={this.handleLogout}
          >
            Logout</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>);
  }
}

Header.contextTypes = {
  router: PropTypes.object.isRequired,
};

Header.propTypes = {
  viewer: PropTypes.object.isRequired,
};

