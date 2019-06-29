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
import NewOption from './asks/NewOption'
import React from 'react'
import Register from './auth/Register'
import SelectDate from './calendar/SelectDate'
import Splash from './splash/Splash'

const App = () => (
  <div>
    <Nav />
    <Switch>
      <AuthRoute exact path="/register" component={Register} routeType="auth" />
      <AuthRoute exact path="/login" component={Login} routeType="auth" />
      <Route exact path="/asks/new" component={AskQuestion} />
      <Route exact path="/asks/:ask_id" component={AskDetail} />
      <Route exact path="/asks/:ask_id/new-option" component={NewOption} />
      <Route exact path="/selectDate" component={SelectDate} />
      <Route exact path="/deadlineDate" component={Deadline} />
      <Route exact path="/askOption" component={AskOption} />
      <Route exact path="/askConfirm" component={AskConfirm} />
      <Route exact path="/" component={Splash} />
      <Route exact path="/askInvite" component={AskInvite} />
      <Route exact path="/users/:user_id/newContact" component={AddContact} />
      {/* <Route path="/asks" component= { AsksIndex } /> */}
    </Switch>
  </div>
)

export default App
