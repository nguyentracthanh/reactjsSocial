import React from 'react';

import Facebook_login from './views/login/Facebook_login'
import Page_facebook from './views/fbPages/Page_facebook'
import SignInSide from './views/login/SignInSide'
import Register from './views/login/Register'
import Home from './views/dashboard/Dashboard'
import { Route , Link, Switch, withRouter} from 'react-router-dom'
import Statistic from './views/statistic/Statistic'

function App() {
  const login = ({

  })
  return (
    <Switch>
      <Route exact path= "/" component={SignInSide} />
      <Route path = "/login" component={SignInSide} />
      <Route path= "/register" component={Register} />
      <Route path= "/home" component={Home} />
      <Route path= "/loginWithFacebook" component={Facebook_login} />
      <Route path= "/stat" component={Statistic} />
    </Switch>
  );
}

export default withRouter(App);
