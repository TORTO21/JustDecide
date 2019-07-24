import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

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
export default props => (
  <Query query={GET_VOTES} variables={{ ask_id: props.ask_id }}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      const votes = data.id

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        votes
      })

      return innerComponent
    }}
  </Query>
)
