import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Splash from './splash/Splash';
import Register from './auth/Register'

const App = () => (
  <div>
    <Splash />
    <Route exact path="/register" component={ Register } routeType="auth" />
  </div>
)

export default App;