import gql from 'graphql-tag'

export const NEW_OPTION = gql`
  mutation NewOption($ask_id: ID!, $creator_id: ID!, $title: String!) {
    newOption(ask_id: $ask_id, creator_id: $creator_id, title: $title) {
      id
      ask {
        id
      }
      title
    }
  }
`
