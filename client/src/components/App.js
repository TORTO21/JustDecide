import '../index.css'

import { Route, Switch } from 'react-router-dom'

// import AddContact from './contacts/AddContact'
// import AskAnswerIndex from './asks/AskAnswerIndex'
// import AskConfirm from './asks/AskConfirm'
// import AskDetail from './asks/AskDetail'
// import AskInvite from './asks/AskInvite'
import AskOption from './asks/AskOption'
import AskQuestion from './ask_question/AskQuestion'
import AuthRoute from '../util/route_util'
import CurrentUserWrapper from '../graphql/queries/current_user_wrapper'
import Deadline from './calendar/Deadline'
// import Errors from './errors/Errors'
import Login from './auth/Login'
import Nav from './nav/Nav'
// import NewOption from './asks/NewOption'
import React from 'react'
import Register from './auth/Register'
import SelectDate from './calendar/SelectDate'
import Splash from './splash/Splash'

const AppWrapper = ({ children }) => {
  const width = window.innerWidth
  if (width > 500) {
    return (
      <div className="app">
        <div className="outer-demo-frame">
          <div className="inner-demo-frame">GIF HERE</div>
        </div>
        <div className="outer-phone-frame">
          <div className="inner-phone-frame">{children}</div>
        </div>
      </div>
    )
  } else {
    return <div className="mobile-holder">{children}</div>
  }
}

const App = () => (
  <CurrentUserWrapper>
    <AppWrapper>
      <Nav />
      <Switch>
        <Route exact path="/" component={Splash} />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute
          exact
          path="/register"
          component={Register}
          routeType="auth"
        />
        <AuthRoute exact path="/asks/new" component={AskQuestion} />
        <AuthRoute exact path="/selectDate" component={SelectDate} />
        <AuthRoute exact path="/deadlineDate" component={Deadline} />
        <AuthRoute exact path="/askOption" component={AskOption} />
      </Switch>

      {/* 
      <AuthRoute exact path="/asks/:ask_id" component={AskDetail} />
      <AuthRoute exact path="/asks/:ask_id/new-option" component={NewOption} />
      <AuthRoute exact path="/asks" component={AskAnswerIndex} />

      <AuthRoute exact path="/askInvite" component={AskInvite} />
      <AuthRoute
        exact
        path="/users/:user_id/newContact"
        component={AddContact}
      />
      <AuthRoute exact path="/askConfirm" component={AskConfirm} />
      <AuthRoute exact path="/asks" component={AskAnswerIndex} />
      <AuthRoute exact path="/asks/:ask_id" component={AskDetail} />
    </Switch> */}
    </AppWrapper>
  </CurrentUserWrapper>
)

export default App
