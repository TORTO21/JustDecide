import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUserId @client {
      id
    }
    loggedIn @client
  }
`

export default props => (
  <Query query={GET_CURRENT_USER}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      console.log(data)
      // return
      // const user_answering = data.user.invited

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        // user_answering
      })

      return innerComponent
    }}
  </Query>
)
