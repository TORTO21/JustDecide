import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'

import Splash from './splash/Splash';
import AuthRoute from '../util/route_util'
import Register from './auth/Register'
import Login from './auth/Login'
import Logout from './auth/Logout'

const App = () => (
  <div>
    <Logout />
    <Link to="/">Home(temporary)</Link>
    <Switch >
      <AuthRoute exact path="/register" component={ Register } routeType="auth" />
      <AuthRoute exact path="/login" component={ Login } routeType="auth" />
      <Route path="/" component= { Splash } />
      
    </Switch>
  </div>
)

export default App;