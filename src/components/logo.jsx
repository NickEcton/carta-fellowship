import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg'

class Logo extends React.Component {
    render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                <code>src/App.js</code> and to reload.
              </p>
              <Link to="/calendar"><button>Gainz</button></Link>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        );
      }
}

export default Logo;