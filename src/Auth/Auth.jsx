import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core';
import SignIn from './SignIn';
import bg from "../Assets/tutorBg.jpg"
import './style.css'
import SignUpForm from './SignUpForm';
import { CreateTutorAccount } from './CreateTutorAccount';


const Auth = () => {
    const { path, url } = useRouteMatch()
    return (
        <>
            {/* <div className="overlay" /> */}
            <div className="auth-container">
                <Grid container justify='center' alignContent='center' spacing={0}>
                    <Grid item>
                        <Switch>
                            <Route exact path={path} render={(props) => <SignIn />} />
                            <Route path={path + '/register'} render={(props) => <SignUpForm {...props} />} />
                            <Route path={path + 'tutor/create'} render={(props) => <CreateTutorAccount {...props}/> }/>
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
