import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core';
import SignIn from './SignIn';
import bg from "../Assets/tutorBg.jpg"
import './style.css'
import SignUpForm from './SignUpForm';
import CreateTutorAccount from './CreateTutorAccount';
import HeadBar from '../Container/HeadBar';
import Footer from '../Container/Footer';
import Hidden from '@material-ui/core/Hidden';
import { me } from "../actions/authAction";
import teach from "../Assets/img/svg_icon/teach.svg";

const Auth = (props) => {
  const history = useHistory();
  const {tutor, user} = props
  React.useEffect(() => {
    const token = localStorage.getItem("P_access_token");
    if (token) {
     !user && props.me();
    }
  }, []);
  useEffect(() => {
    tutor && tutor.id && history.push("/");
    // !tutor && history.push('/auth/tutor/create')
  }, [props.tutor]);
  useEffect(() => {
      !user && history.push('/auth')
    //   user && !user.tutor_id && history.push("/auth/tutor/create");
  }, [props.user])
  const { path, url } = useRouteMatch();
  return (
    <>
      {/* <div className="overlay" /> */}
      <div className="p-4">
        <HeadBar />
        <Grid container>
          <Hidden mdDown>
            <Grid item xs={6} alignContent="center" alignItems="center">
              <Typography
                variant="h6"
                color='primary'
                style={{ alignSelf: "center", marginTop: "10%" }}
              >
                Help our students learn new skills, transform their careers and
                businesses by becoming an instructor.
              </Typography>
              <img src={teach} alt="" className='w-100' />
            </Grid>
          </Hidden>
          <Grid item xs={12} md={6}>
            <Switch>
              <Route exact path={path} render={(props) => <SignIn />} />
              <Route
                exact
                path={path + "/register"}
                render={(props) => <SignUpForm {...props} />}
              />
              <Route
                exact
                path={path + "/tutor/create"}
                render={(props) => <CreateTutorAccount {...props} />}
              />
            </Switch>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  isLogin: state.auth.isLogin,
  loggingIn: state.auth.loggingIn,
  loginError: state.auth.loginError,
  token: state.auth.token,
  tutor: state.auth.tutor,
  user: state.auth.user,
});

const mapDispatchToProps = {
  me,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
