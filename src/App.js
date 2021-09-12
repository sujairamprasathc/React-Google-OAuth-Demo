import './App.css';

import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      loggedIn: false,
    }
    
    // https://stackoverflow.com/questions/3263161/cannot-set-boolean-values-in-localstorage
    // JSON.parse is necessary as localstorage is typeless and can only return strings
    // Without JSON.parse the page will not render login/logout state correctly and will
    // always render any one of the two by default on page refresh
    this.state.loggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;
  }

  loginSuccess()
  {
    this.setState({loggedIn: true});
    localStorage.setItem('loggedIn', true);
  }

  logoutSuccess()
  {
    this.setState({loggedIn: false});
    localStorage.setItem('loggedIn', false);
  }

  render()
  {
    //console.log(this.state.loggedIn, true, this.state.loggedIn == true, this.state.loggedIn === true);
    //console.log(localStorage.getItem('loggedIn'), true, localStorage.getItem('loggedIn') == 'true',
    //  JSON.parse(localStorage.getItem('loggedIn')));
    if (this.state.loggedIn === true) {
      return (
        <div className="App">
          <GoogleLogout
            clientId="999984509153-hs1e07d5r9o6df9i4m1q4qh0u0h5chcq.apps.googleusercontent.com"
            onLogoutSuccess={() => this.logoutSuccess()}
          />
        </div>
      );
    }

    return (
      <div className="App">
        <GoogleLogin
          clientId="999984509153-hs1e07d5r9o6df9i4m1q4qh0u0h5chcq.apps.googleusercontent.com"
          onSuccess={() => this.loginSuccess()}
        />
      </div>
    );
  }
}

export default App;
