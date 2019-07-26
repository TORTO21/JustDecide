import { ApolloConsumer } from 'react-apollo'
import IsLoggedInWrapper from '../../graphql/queries/is_logged_in_wrapper'
import React from 'react'
import { withRouter } from 'react-router-dom'

const Logout = props => {
  return (
    <ApolloConsumer>
      {clientCache => {
        if (props.isLoggedIn) {
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
    </ApolloConsumer>
  )
}

const LogoutButton = withRouter(Logout)

export default () => (
  <IsLoggedInWrapper>
    <LogoutButton />
  </IsLoggedInWrapper>
)
