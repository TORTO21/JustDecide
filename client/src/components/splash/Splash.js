import './Splash.css'

import Queries from '../../graphql/queries/auth_queries'
import { Query } from 'react-apollo'
import React from 'react'
import { withRouter } from 'react-router-dom'

const { IS_LOGGED_IN } = Queries

const Splash = props => {
  return (
    <div className="splash-container">
      <div className="splash-title">just decide</div>
      <div className="splash-subtitle">
        Ask a question and invite friends and family to weigh in
      </div>
      <div className="splash-buttons">
        <div className="splash-auth-buttons-container">
          <Query query={IS_LOGGED_IN}>
            {({ errors, data }) => {
              if (!data.isLoggedIn) {
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
            }}
          </Query>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Splash)
