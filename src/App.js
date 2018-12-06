import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import logo from './logo.svg';
import Logo from './components/logo.jsx'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logo />
      </div>
    );
  }
}

export default App;
