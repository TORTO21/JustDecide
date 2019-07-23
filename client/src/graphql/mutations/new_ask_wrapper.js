import gql from 'graphql-tag'
import React from 'react';
import { Mutation } from 'react-apollo'
import { GET_USER_ASKS, GET_USER_ANSWERING } from '../queries/ask_queries'

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

export default props => (
  <Mutation mutation={ NEW_ASK }>
    {mutationNewAsk => {
      const newAsk = ask => {
        return mutationNewAsk({
          variables: { ...ask },
          refetchQueries: () => [
            { query: GET_USER_ASKS },
            { query: GET_USER_ANSWERING },
          ]
        })
      }
      const { children, ...otherProps } = props
      const InnerComponent = React.cloneElement(children, {
        ...otherProps,
        newAsk
      })

      return InnerComponent
    }}
  </Mutation>
)
