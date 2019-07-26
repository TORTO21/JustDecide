import { GET_ASK } from '../queries/get_ask_wrapper'
import { Mutation } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const UPDATE_VOTE = gql`
  mutation UpdateVote($id: ID!, $direction: String!) {
    updateVote(id: $id, direction: $direction) {
      id
    }
  }
`

export default props => (
  <Mutation mutation={UPDATE_VOTE}>
    {mutationUpdateVote => {
      const updateVote = ({ ask_id, id, direction }) => {
        return mutationUpdateVote({
          variables: { id, direction },
          refetchQueries: () => [{ query: GET_ASK, variables: { id: ask_id } }]
        })
      }
      const { children, ...otherProps } = props
      const InnerComponent = React.cloneElement(children, {
        ...otherProps,
        updateVote
      })

      return InnerComponent
    }}
  </Mutation>
)
