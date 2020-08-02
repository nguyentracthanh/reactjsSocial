import React from 'react';

import Facebook_login from './views/login/Facebook_login'

import Register from './views/login/Register'
import Home from './views/dashboard/Dashboard'
import { Route , Switch} from 'react-router-dom'
import Statistic from './views/statistic/Statistic'
import Category from './views/Category/category'

import Post from './views/posts/Posts'
function App() {
 
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
