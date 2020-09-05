import React, { useEffect } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../Assets/logoWhite.png'
import { login } from '../actions/authAction'
import { connect } from 'react-redux'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'


const SignIn = (props) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState('')
    const history = useHistory()
    const { isLogin,
        loggingIn,
        loginError } = props
    const handleLogin = () => {
        if (email !== '') {
            props.login(email, password)
        }
    }
    useEffect(() => {
        props.token && history.push('/')
    }, [props.token])
    return (
        <Grid textAlign='center' style={{ height: '100vh', zIndex: 10 }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 700 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    <Image src={logo} /> Log-in to your User account
      </Header>
                <Form size='large' error={loginError}>
                    <Segment stacked>
                        <Message hidden={!loginError} negative={loginError}>{loginError}</Message>
                        <Form.Input onChange={e => setEmail(e.target.value)} fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={e => setPassword(e.target.value
                            )}
                        />
                        <Button loading={loggingIn} onClick={handleLogin} color='blue' fluid size='large'>
                            Login </Button>
                    </Segment>
                </Form>
                <Message>
                    You don't have an account? <Link to="/register">Create One</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    isLogin: state.auth.isLogin,
    loggingIn: state.auth.loggingIn,
    loginError: state.auth.loginError,
    token: state.auth.token,
})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)