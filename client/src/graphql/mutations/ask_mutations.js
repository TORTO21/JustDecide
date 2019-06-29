import gql from 'graphql-tag'

export const DELETE_ASK = gql`
  mutation DeleteAsk($id: ID!) {
    deleteAsk(id: $id) {
      id
    }
  }
`