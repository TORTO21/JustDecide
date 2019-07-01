import gql from 'graphql-tag'

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

export const CURRENT_USER_CONTACT_DATA = gql`
  query currentUserContactData($id: ID!) {
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

export const CURRENT_USER_ID = gql`
  query {
    currentUserId @client
  }
`

export const ASK_INVITEES = gql`
  query {
    askInvitees @client
  }
`
