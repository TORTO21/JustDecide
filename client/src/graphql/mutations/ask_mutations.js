import gql from 'graphql-tag'

export const DELETE_ASK = gql`
  mutation DeleteAsk($id: ID!) {
    deleteAsk(id: $id) {
      id
    }
  }
`

export const NEW_ASK = gql`
  mutation NewAsk(
    $author_id: ID!
    $name_used_id: ID!
    $question: String!
    $use_date: Boolean
    $use_time: Boolean
    $date: String
    $deadline: String
  ) {
    newAsk(
      author_id: $author_id
      name_used_id: $name_used_id
      question: $question
      use_date: $use_date
      use_time: $use_time
      date: $date
      deadline: $deadline
    ) {
      id
      author {
        id
      }
      name_used {
        name
      }
      question
      use_date
      use_time
      date
      deadline
      invitations {
        id
        contact {
          id
          user {
            id
          }
          name
        }
      }
      options {
        id
        creator {
          user {
            id
          }
          name
        }
        title
        votes {
          id
          contact {
            user {
              id
            }
            name
          }
          direction
        }
      }
    }
  }
`

