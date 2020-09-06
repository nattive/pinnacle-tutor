import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from '../actions/authAction'
import { Alert } from "@material-ui/lab";
import { Link, Redirect } from "react-router-dom";
class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user && props.user.name,
      account_type: "",
      email: "",
      password: "",
      error: "",
      ConfirmPassword: "",
      token: props.token,
      hasError: null,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: [e.target.value][0],
    });
    console.log(e);
  }

  componentDidUpdate(props, state) {
    if (this.props.token !== null)
      return this.props.history.push('/auth/tutor/create')
  }

  handleChange(event) {
    this.setState({ account_type: event.target.value });
  }
  handleSubmit(e) {
    let credentials = {
      name: this.state.name,
      password: this.state.password,
      confirm_password: this.state.ConfirmPassword,
      account_type: this.state.account_type,
      email: this.state.email,
    };
    this.props.register(credentials);
    // console.log(this.props);
  }

  render() {
    const formField = [
      {
        name: "name",
        type: "text",
        placeholder: "Full Name",
        error: this.props.hasError && this.props.hasError.name,
        onChange: e => this.setState({ name: e.target.value })
      },
      {
        name: "email",
        type: "email",
        placeholder: "Email Address",
        error: this.props.hasError && this.props.hasError.email,
        onChange: e => this.setState({ email: e.target.value })
      },
      {
        type: "password",
        placeholder: "Password",
        error: this.props.hasError && this.props.hasError.password,
        onChange: e => this.setState({ password: e.target.value }),
        name: "password",
      },
      {
        onChange: e => this.setState({ ConfirmPassword: e.target.value }),
        type: "password",
        placeholder: "Confirm Password",
        error: this.props.hasError && this.props.hasError.ConfirmPassword,
        name: "ConfirmPassword",
      },
    ];
    const { isRegistering,
      hasError,
      registered,
      registerError,
      loginError } = this.props
    return (
      
      <Grid textAlign='center' style={{ height: '100vh', zIndex: 10 }} verticalAlign='middle'>
        <Grid.Column >
          <Header as='h2' color='teal' textAlign='center'>
            Create An Account
      </Header>
          <Form size='large' error={hasError}>
            <Segment stacked>
              <Message hidden={!registerError} negative={registerError}>{registerError}</Message>
              {formField.map((item, key) => (
                <Form.Input
                  fluid
                  // icon='lock'
                  // iconPosition='left'
                  error={item.error}
                  placeholder={item.placeholder}
                  type={item.type}
                  onChange={item.onChange}
                />))}
              <Button loading={isRegistering} onClick={this.handleSubmit} color='blue' fluid size='large'>
                Register </Button>
            </Segment>
          </Form>
          <Message>
            <Link to="/auth">Login </Link>  if you already have an account
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  isRegistering: state.auth.isRegistering,
  registered: state.auth.registered,
  registerError: state.auth.registerError,
  hasError: state.auth.hasError,
  token: state.auth.token,
  user: state.auth.user,
});


export default connect(mapStateToProps, {
  register
})(SignUpForm);
