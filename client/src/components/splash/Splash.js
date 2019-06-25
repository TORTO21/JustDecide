import React from 'react';
import Logout from '../auth/Logout'
import './Splash.css';

const Splash = () => {
  return (
    <div>
      <div className="splash-title">just decide</div>
      <div className="splash-subtitle">Ask a question and invite friends and family to weigh in</div>
      <div className="splash-buttons">
        <button className="create-ask-button">Create an Ask</button>
        <div className="splash-auth-buttons">
          <Logout />
          <button className="solid-pink-button">Sign Up</button>
          <button className="solid-pink-button">Login</button>
        </div>
      </div> 
    </div>
  )
}

export default Splash;