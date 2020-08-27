import React from 'react';
import logo from './logo.svg';
import './App.css';
import SideNav from './Container/SideNav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './constants/store';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <SideNav />
      </Router>
    </Provider>
  );
}

export default App;
