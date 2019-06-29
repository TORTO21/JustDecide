import { ApolloConsumer, Query } from 'react-apollo'

import Queries from '../../graphql/queries/auth_queries'
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
                <button
                  style={{
                    width: 87,
                    height: 24
                  }}
                  className="solid-pink-button"
                  onClick={e => {
                    e.preventDefault()
                    localStorage.removeItem('auth-token')
                    localStorage.removeItem('current-user')
                    clientCache.writeData({
                      data: {
                        isLoggedIn: false,
                        currentUserId: ''
                      }
                    })
                    props.history.push('/')
                  }}
                >
                  Logout
                </button>
              )
            } else {
              return null
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  )
}

export default withRouter(Logout)
