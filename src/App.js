import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Splash from './components/splash.jsx'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Splash}/>
        </Switch>
      </div>
    );
  }
}

export default App;
