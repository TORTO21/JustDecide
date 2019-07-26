import { GET_USER_ASKS } from '../queries/get_user_asks_wrapper'
import { Mutation } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const DELETE_INVITATION = gql`
  mutation DeleteInvitation($id: ID!) {
    deleteInvitation(id: $id) {
      id
    }
  }
`

export default props => (
  <Mutation mutation={ DELETE_INVITATION }>
    {mutationDeleteInvitation => {
      const deleteInvitation = id => {
        return mutationDeleteInvitation({
          variables: { id },
          // refetchQueries: () => [{ query: GET_USER_ASKS }]
        })
      }
      const { children, ...otherProps } = props
      const InnerComponent = React.cloneElement(children, {
        ...otherProps,
        deleteInvitation
      })

      return InnerComponent
    }}
  </Mutation>
)
