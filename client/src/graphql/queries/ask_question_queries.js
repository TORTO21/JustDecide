import gql from 'graphql-tag'

export const GET_USER_CONTACTS = gql`
  query getUserContacts($id: ID!) {
    user(id: $id) {
      id
      contacts {
        name
        user {
          id
        }
      }
    }
  }
`
