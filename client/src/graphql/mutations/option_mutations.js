import gql from 'graphql-tag'

export const NEW_OPTION = gql`
  mutation NewOption($creator_id: ID!, $ask_id: ID!, $title: String!) {
    newOption(creator_id: $creator_id, ask_id: $ask_id, title: $title) {
      id
    }
  }
`
