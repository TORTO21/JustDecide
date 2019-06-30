import '../index.css'
import '../index.css'

import { Route, Switch } from 'react-router-dom'

import AddContact from './contacts/AddContact'
import AskConfirm from './asks/AskConfirm'
import AskDetail from './asks/AskDetail'
import AskInvite from './asks/AskInvite'
import AskOption from './asks/AskOption'
import AskQuestion from './ask_question/AskQuestion'
import AuthRoute from '../util/route_util'
import Deadline from './calendar/Deadline'
import Login from './auth/Login'
import Nav from './nav/Nav'
import React from 'react'
import Register from './auth/Register'
import SelectDate from './calendar/SelectDate'
import Splash from './splash/Splash'
import Errors from './errors/Errors'
import AskAnswerIndex from './asks/AskAnswerIndex';
import NewOption from './asks/NewOption';
import '../index.css';

const App = () => (
  <div>
    <Nav />
    {/* <Errors /> */}
    <Switch>
      <AuthRoute exact path="/register" component={Register} routeType="auth" />
      <AuthRoute exact path="/login" component={Login} routeType="auth" />
      <AuthRoute exact path="/asks/new" component={AskQuestion} />
      <AuthRoute exact path="/asks/:ask_id" component={AskDetail} />
      <AuthRoute exact path="/asks/:ask_id/new-option" component={NewOption} />
      <AuthRoute exact path="/asks" component= { AskAnswerIndex } />
      <AuthRoute exact path="/selectDate" component={SelectDate} />
      <AuthRoute exact path="/deadlineDate" component={Deadline} />
      <AuthRoute exact path="/askOption" component={AskOption} />
      <AuthRoute exact path="/askConfirm" component={AskConfirm} />
      <AuthRoute exact path="/askInvite" component={AskInvite} />
      <AuthRoute exact path="/users/:user_id/newContact" component={AddContact} />
      <Route exact path="/" component={Splash} />
    </Switch>
  </div>
)

export default App
