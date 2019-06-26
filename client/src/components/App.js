import { Link, Route, Switch } from 'react-router-dom'

import AskDetail from './asks/AskDetail'
import AuthRoute from '../util/route_util'
import Login from './auth/Login'
import Logout from './auth/Logout'
import NewOption from './asks/NewOption'
import React from 'react'
import Register from './auth/Register'
import Splash from './splash/Splash'

// import NewAsk from './asks/NewAsk'

const App = () => (
  <div>
    <Logout />
    <Link className="home" to="/">
      Home(temporary)
    </Link>
    <Switch>
      <AuthRoute exact path="/register" component={Register} routeType="auth" />
      <AuthRoute exact path="/login" component={Login} routeType="auth" />
      <Route exact path="/" component={Splash} />
      {/* <Route path="/asks" component= { Index } /> */}
      <Route exact path="/asks/:ask_id" component={AskDetail} />
      <Route exact path="/asks/:ask_id/new-option" component={NewOption} />
      {/* <Route path="/new" component = { NewAsk } /> */}
    </Switch>
  </div>
)

export default App
