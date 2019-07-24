import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

// Can't find this query anywhere. It hasn't been tested.
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

export default props => (
  <Query query={GET_ANSWERS} variables={{ id: props.currentUserId }}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      const answers = data.user.votes.option

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        answers
      })

      return innerComponent
    }}
  </Query>
)
