import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const GET_CURRENT_USER = gql`
  query {
    currentUserId @client
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

      const { currentUserId } = data

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        currentUserId
      })

      return innerComponent
    }}
  </Query>
)
