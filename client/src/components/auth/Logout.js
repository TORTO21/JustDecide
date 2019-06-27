import { ApolloConsumer, Query } from 'react-apollo'

import Queries from '../../graphql/queries'
import React from 'react'
import { withRouter } from 'react-router-dom'
const { IS_LOGGED_IN } = Queries

const Logout = props => {
  return (
    <ApolloConsumer>
      {clientCache => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div>
                  <button
                    className="solid-pink-button logout"
                    onClick={e => {
                      e.preventDefault()
                      localStorage.removeItem('auth-token')
                      clientCache.writeData({ data: { isLoggedIn: false } })
                      props.history.push('/')
                    }}
                  >
                    Logout
                  </button>
                </div>
              )
            } else {
              return null
              // (
              //   <div>
              //     <Link to="/">Home</Link>
              //     <Link to="/login">Login</Link>
              //     <Link to="/register">Register</Link>
              //   </div>
              // );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  )
}

export default withRouter(Logout)
