import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

// Can't find this query anywhere. It hasn't been tested.
export const GET_CONTACTS = gql`
  query getContacts($id: ID!) {
    user(id: $id) {
      id
      contacts {
        id
        name
        user {
          id
          phone_number
        }
      }
    }
  }
`

export default props => (
  <Query query={ GET_CONTACTS } variables={{ id: props.currentUserId }}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      const { contacts } = data.user

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        contacts
      })

      return innerComponent
    }}
  </Query>
)
