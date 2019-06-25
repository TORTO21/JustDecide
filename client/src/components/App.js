import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'

import Splash from './splash/Splash';
import AuthRoute from '../util/route_util'
import Register from './auth/Register'
import Login from './auth/Login'
import Logout from './auth/Logout'
// import NewAsk from './asks/NewAsk'

import SelectDate from './calendar/SelectDate';

const App = () => (
  <div>
    <Logout />
    <Link className="home" to="/">Home(temporary)</Link>
    <Switch >
      <AuthRoute exact path="/register" component={ Register } routeType="auth" />
      <AuthRoute exact path="/login" component={ Login } routeType="auth" />
      <Route path="/" component= { Splash } />
      {/* <Route path="/asks" component= { Index } /> */}
      {/* <Route path="/asks/:ask_id" component= { AskDetail } /> */}
      {/* <Route path="/new" component = { NewAsk } /> */}
    </Switch>

  </div>
)

export default App;