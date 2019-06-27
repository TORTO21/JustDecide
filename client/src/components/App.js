import { Link, Route, Switch } from 'react-router-dom'

import AskDetail from './asks/AskDetail'
import AuthRoute from '../util/route_util'
import Login from './auth/Login'
import Logout from './auth/Logout'
import NewOption from './asks/NewOption'
import React from 'react'
import Register from './auth/Register'
import Splash from './splash/Splash'
import AskQuestion from './asks/AskQuestion'
import SelectDate from './calendar/SelectDate';
import Deadline from './calendar/Deadline';
import AskOption from './asks/AskOption';
import '../index.css';

const App = () => (
  <div>
    <Logout />
    <Link className="home button" to="/">
      <svg width="30" height="28" viewBox="0 0 60 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.4674 22.0386L30 5.50598L46.5326 22.0386H46.529V49.5868H13.4711V22.0386H13.4674ZM7.9615 27.5445L3.89311 31.6129L0 27.7198L26.1074 1.61237C28.2572 -0.537456 31.7428 -0.537456 33.8926 1.61237L60 27.7198L56.1069 31.6129L52.0386 27.5446V49.5868C52.0386 52.6297 49.5719 55.0964 46.529 55.0964H13.4711C10.4282 55.0964 7.9615 52.6297 7.9615 49.5868V27.5445Z" fill="white"/>
      </svg>
    </Link>
    <Switch >
      <AuthRoute exact path="/register" component={ Register } routeType="auth" />
      <AuthRoute exact path="/login" component={ Login } routeType="auth" />
      <Route path="/asks/new" component = { AskQuestion } />
      <Route exact path="/asks/:ask_id" component={AskDetail} />
      <Route exact path="/asks/:ask_id/new-option" component={NewOption} />
      <Route exact path="/selectDate" component={ SelectDate } />
      <Route exact path="/deadlineDate" component={ Deadline } />
      <Route exact path="/askOption" component={ AskOption } />
      <Route path="/" component= { Splash } />
      {/* <Route path="/asks" component= { AsksIndex } /> */}
    </Switch>
  </div>
)

export default App
