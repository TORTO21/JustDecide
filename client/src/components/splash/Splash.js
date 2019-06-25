import React from 'react';
import { withRouter } from 'react-router-dom'
import './Splash.css';

const Splash = props => {
  return (
    <div className="background">
      <div className="splash-title">just decide</div>
      <div className="splash-subtitle">Ask a question and invite friends and family to weigh in</div>
      <div className="splash-buttons">
        <button className="create-ask-button">Create an Ask</button>
        <div className="splash-auth-buttons">
          <button 
            className="solid-pink-button"
            onClick={ () => props.history.push("/register") } >
              Sign Up
          </button>
          <button
            className="solid-pink-button" 
            onClick={ () => props.history.push("/login") } >
              Login
          </button>
        </div>
      </div> 
    </div>
  )
}

export default withRouter(Splash);