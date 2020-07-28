import React from 'react';

import Facebook_login from './views/login/Facebook_login'
import Page_facebook from './views/fbPages/Page_facebook'
import SignInSide from './views/login/SignInSide'
import Register from './views/login/Register'
import Home from './views/dashboard/Dashboard'
import { Route , Link, Switch, withRouter} from 'react-router-dom'
import Statistic from './views/statistic/Statistic'
import Category from './views/Category/category'
import getdatafb from './views/fbPages/ReactfbPagedata'
import UserProvider  from './utils/userContext'
import Post from './views/posts/Posts'
function App() {
  const login = ({

  })
  return (
    <Switch>
      <Route exact path= "/" component={Home} />
      <Route path = "/category" component={Category} />
      <Route path= "/register" component={Register} />
      <Route path= "/home" component={Home} />
      <Route path= "/loginWithFacebook" component={Facebook_login} />
      <Route path= "/stat" component={Statistic} />
      <Route path ="/post" component={Post}/>
    </Switch>
    
  );
}

export default App;
