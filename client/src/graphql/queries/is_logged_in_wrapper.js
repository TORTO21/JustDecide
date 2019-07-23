import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`

export default props => (
  <Query query={IS_LOGGED_IN}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      const { isLoggedIn } = data

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        isLoggedIn
      })

      return innerComponent
    }}
  </Query>
)
