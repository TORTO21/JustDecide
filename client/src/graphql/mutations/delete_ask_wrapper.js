import { GET_USER_ASKS } from '../queries/get_user_asks_wrapper'
import { Mutation } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const DELETE_ASK = gql`
  mutation DeleteAsk($id: ID!) {
    deleteAsk(id: $id) {
      id
    }
  }
`

export default props => (
  <Mutation mutation={DELETE_ASK}>
    {mutationDeleteAsk => {
      const deleteAsk = id => {
        return mutationDeleteAsk({
          variables: { id },
          refetchQueries: () => [{ query: GET_USER_ASKS }]
        })
      }
      const { children, ...otherProps } = props
      const InnerComponent = React.cloneElement(children, {
        ...otherProps,
        deleteAsk
      })

      return InnerComponent
    }}
  </Mutation>
)
