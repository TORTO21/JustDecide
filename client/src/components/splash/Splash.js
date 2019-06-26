import React from 'react';
import { withRouter } from 'react-router-dom'
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import './Splash.css';
const { IS_LOGGED_IN } = Queries;

const Splash = props => {
  return (
    <div className="splash-container background">
      <div className="splash-title">just decide</div>
      <div className="splash-subtitle">Ask a question and invite friends and family to weigh in</div>
      <div className="splash-buttons">
        <button
          className="create-ask-button button"
          onClick={ () => props.history.push("/new") } >
            Create an Ask
        </button>
        <div className="splash-auth-buttons-container">
          <Query query={ IS_LOGGED_IN }>
            {({ data }) => {
              if (!data.isLoggedIn) {
                return (
                  <div className="splash-auth-buttons">
                    <button 
                      className="solid-pink-button button"
                      onClick={ () => props.history.push("/register") } >
                        Sign Up
                    </button>
                    <button
                      className="solid-pink-button button" 
                      onClick={ () => props.history.push("/login") } >
                        Login
                    </button>
                  </div>
                );
              } else {
                return null
              }
            }}
          </Query>
        </div>
      </div> 
    </div>
  )
}

export default withRouter(Splash);