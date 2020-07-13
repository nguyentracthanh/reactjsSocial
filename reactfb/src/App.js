import React, { Component } from 'react';

import Facebook_login from './components/Facebook_login'
import Page_facebook from './components/Page_facebook'
import SignInSide from './components/SignInSide'
import Register from './components/Register'
import Home from './components/home'
import { Route , Link, Switch} from 'react-router-dom'


function App() {
  return (
    <Switch>
      <Route exact path= "/" component={SignInSide} />
      <Route exact path= "/login" component={SignInSide} />
      <Route path= "/register" component={Register} />
      <Route path= "/home" component={Home} />
      <Route path= "/loginWithFacebook" component={Facebook_login} />

    </Switch>
  );
}

export default App;
