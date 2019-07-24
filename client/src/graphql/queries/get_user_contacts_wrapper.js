import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const GET_USER_CONTACTS = gql`
  query getUserContacts($id: ID!) {
    user(id: $id) {
      id
      phone_number
      contacts {
        id
        phone_number
        name
      }
    }
  }
`
export default props => (
  <Query query={GET_USER_CONTACTS} variables={{ id: props.currentUserId }}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      const user_contacts = data.user.contacts

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        user_contacts
      })

      return innerComponent
    }}
  </Query>
)
