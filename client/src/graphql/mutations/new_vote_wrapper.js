import { GET_ASK } from '../queries/ask_queries'
import { Mutation } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const NEW_VOTE = gql`
  mutation NewVote($option_id: ID!, $contact_id: ID!, $direction: String!) {
    newVote(
      option_id: $option_id
      contact_id: $contact_id
      direction: $direction
    ) {
      id
    }
  }
`

export default props => (
  <Mutation mutation={NEW_VOTE}>
    {mutationNewVote => {
      const newVote = ({ ask_id, option_id, contact_id, direction }) => {
        return mutationNewVote({
          variables: { option_id, contact_id, direction },
          refetchQueries: () => [{ query: GET_ASK, variables: { id: ask_id } }]
        })
      }
      const { children, ...otherProps } = props
      const InnerComponent = React.cloneElement(children, {
        ...otherProps,
        newVote
      })

      return InnerComponent
    }}
  </Mutation>
)
