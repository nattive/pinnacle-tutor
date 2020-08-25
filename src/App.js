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
function App() {
  return (
    <Router>
     <SideNav /> 
    </Router>
  );
}

export default App;
