import gql from 'graphql-tag'

export const GET_ANSWERS = gql`
  query FindAnswers($user_id: ID!) {
    user(id: $user_id) {
      votes {
        option {
          ask {
            question
            date
          }
        }
      }
    }
  }
`
