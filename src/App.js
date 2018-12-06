import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Logo from './components/logo.jsx'
import Calendar from './components/calendar.jsx'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Logo}/>
          <Route exact path="/calendar" component={Calendar}/>
        </Switch>
      </div>
    );
  }
}

export default App;
