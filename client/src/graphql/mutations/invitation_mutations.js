import { gql } from 'graphql-tag'

export const DELETE_INVITATION = gql`
  mutation DeleteInvitation($id: ID!) {
    deleteInvitation(id: $id) {
      id
    }
  }
`
