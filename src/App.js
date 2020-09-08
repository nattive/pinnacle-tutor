import React from 'react';
import logo from './logo.svg';
import './App.css';
import SideNav from './Container/AppContainer';
import Footer from "./Container/Footer.jsx"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './constants/store';
import Auth from './Auth';
import './Assets/css/style.css'
import "./Assets/css/bootstrap.min.css"
import HeadBar from './Container/HeadBar';
import 'semantic-ui-css/semantic.min.css';
import AppContainer from "./Container/AppContainer";
import CourseClass from './Pages/Course';
import CourseLists from './Pages/Course/CourseLists';
import { Grid, ThemeProvider, createMuiTheme } from '@material-ui/core';
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <AppContainer />,
    main: () => <h2>Home</h2>
  },
  {
    path: "/courses",
    sidebar: () => <AppContainer />,
    main: () => <CourseClass />
  },
  {
    path: "/auth",
    sidebar: () => null,
    main: () => <Auth />
  },
  {
    path: "/myCourses",
    sidebar: () => <AppContainer />,
    main: () => <CourseLists />
  }

];

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#000066",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#d1a802",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
         <Switch>
            <Route exact path="/" component={props =>   <AppContainer {...props} /> }/>
            <Route path="/auth" component={props => <Auth {...props} /> }/>
         </Switch>
        </Router>
      </ThemeProvider>
    </Provider> 
  );
}

export default App;
