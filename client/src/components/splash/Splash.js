import './Splash.css'

import IsLoggedInWrapper from '../../graphql/queries/is_logged_in_wrapper'
import React from 'react'
import { withRouter } from 'react-router-dom'

const Splash = props => {
  let makeButtons = () => {
    if (!props.isLoggedIn) {
      return (
        <div className="splash-auth-buttons">
          <button
            className="solid-pink-button button"
            onClick={() => props.history.push('/register')}
          >
            Sign Up
          </button>
          <button
            className="solid-pink-button button"
            onClick={() => props.history.push('/login')}
          >
            Login
          </button>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div className="splash-container">
      <div className="splash-title">just decide</div>
      <div className="splash-subtitle">
        Ask a question and invite friends and family to weigh in
      </div>
      <div className="splash-buttons">
        <div className="splash-auth-buttons-container">{makeButtons()}</div>
      </div>
    </div>
  )
}

const SplashPage = withRouter(Splash)

export default () => (
  <IsLoggedInWrapper>
    <SplashPage />
  </IsLoggedInWrapper>
)
