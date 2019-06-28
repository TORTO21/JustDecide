import gql from 'graphql-tag';

export const GET_VOTES = gql`
  query getVotes($ask_id: ID!) {
    ask(id: $ask_id) {
      id
      question {
        options {
          votes {
            direction
            id
            contact {
              user {
                id
              }
            }
          }
        }
      }
    }
  }
`