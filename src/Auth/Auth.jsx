import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core';
import SignIn from './SignIn';
import bg from "../Assets/tutorBg.jpg"
import './style.css'
import SignUpForm from './SignUpForm';
import CreateTutorAccount from './CreateTutorAccount';
import HeadBar from '../Container/HeadBar';
import Footer from '../Container/Footer';


const Auth = () => {
    const { path, url } = useRouteMatch()
    return (
        <>
            {/* <div className="overlay" /> */}
            <div className="auth-container">
                <HeadBar />
                <Grid container justify='center' alignContent='center' >
                    <Switch>
                        <Route exact path={path} render={(props) => <SignIn />} />
                        <Route exact path={path + '/register'} render={(props) => <SignUpForm {...props} />} />
                        <Route exact path={path + '/tutor/create'} render={(props) => <CreateTutorAccount {...props} />} />
                    </Switch>
                </Grid>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
