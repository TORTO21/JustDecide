import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const NEW_ASK_DETAILS = gql`
  query {
    newAsk @client {
      id
    }
  }
`

export default props => (
  <Query query={NEW_ASK_DETAILS}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      const { newAsk } = data

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        newAsk
      })

      return innerComponent
    }}
  </Query>
)
