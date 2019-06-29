import gql from 'graphql-tag'

export const DELETE_ASK = gql`
  mutation deleteAsk($id: ID!) {
    deleteAsk(id: $id) {
      id
    }
  }
`