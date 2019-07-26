import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const GET_CURRENT_USER_CONTACT_DATA = gql`
  query getCurrentUserContactData($id: ID!) {
    user(id: $id) {
      id
      phone_number
      contacts {
        phone_number
        id
        name
      }
    }
  }
`

export default props => (
  <Query query={GET_CURRENT_USER_CONTACT_DATA} variables={{ id: props.currentUserId }}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      const currentUserContacts = data.user.contacts

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        currentUserContacts
      })

      return innerComponent
    }}
  </Query>
)
