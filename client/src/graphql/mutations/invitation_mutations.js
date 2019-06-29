import gql from 'graphql-tag'

export const DELETE_INVITATION = gql`
  mutation DeleteInvitation($id: ID!) {
    deleteInvitation(id: $id) {
      id
    }
  }
`

export const NEW_INVITATION = gql`
  mutation NewInvitation(
    $ask_id: ID!
    $contact_id: ID!
    $status: String
    $invite_url: String
  ) {
    newInvitation(
      ask_id: $ask_id
      contact_id: $contact_id
      status: $status
      invite_url: $invite_url
    ) {
      id
    }
  }
`
