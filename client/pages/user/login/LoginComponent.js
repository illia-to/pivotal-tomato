import React from 'react';
import Relay from 'react-relay';
import { browserHistory } from 'react-router';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  Button,
  ControlLabel
 } from 'react-bootstrap';

import LoginMutation from '../../../mutation/LoginMutation';

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const self = this;
    Relay.Store.commitUpdate(
      new LoginMutation({
        email: self.state.email,
        password: self.state.password,
        user: self.props.viewer.user || {}
      }),
      {
        onFailure: () => {
          console.log('login failed');
        },
        onSuccess: () => {
          browserHistory.push('/projects');
        }
      }
    );
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId='formHorizontalEmail'>
          <Col componentClass={ControlLabel} sm={2}>
            Email
      </Col>
          <Col sm={10}>
            <FormControl
              type='email'
              placeholder='example@mail.com'
              value={this.state.email} onChange={this.handleEmailChange}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId='formHorizontalPassword'>
          <Col componentClass={ControlLabel} sm={2}>
            Password
      </Col>
          <Col sm={10}>
            <FormControl
              type='password'
              placeholder='Password'
              value={this.state.password} onChange={this.handlePasswordChange}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type='submit' onClick={this.handleSubmit}>
              Sign in
        </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
