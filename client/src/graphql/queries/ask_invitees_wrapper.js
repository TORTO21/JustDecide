import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const ASK_INVITEES = gql`
  query {
    askInvitees @client
  }
`

export default props => (
  <Query query={ASK_INVITEES}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      const { askInvitees } = data

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        askInvitees
      })

      return innerComponent
    }}
  </Query>
)
