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
