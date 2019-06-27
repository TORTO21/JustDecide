import gql from 'graphql-tag'

export const NEW_VOTE = gql`
  mutation NewVote($option_id: ID!, $contact_id: ID!, $direction: String!) {
    newVote(
      option_id: $option_id
      contact_id: $contact_id
      direction: $direction
    ) {
      id
    }
  }
`

export const UPDATE_VOTE = gql`
  mutation UpdateVote($id: ID!, $direction: String!) {
    updateVote(id: $id, direction: $direction) {
      id
    }
  }
`
