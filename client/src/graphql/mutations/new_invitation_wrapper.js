import gql from 'graphql-tag'
import React from 'react';
import { Mutation } from 'react-apollo'
import { GET_USER_ASKS } from '../queries/get_user_asks_wrapper'

export const NEW_INVITATION = gql`
  mutation NewInvitation(
    $ask_id: ID!
    $contact_id: ID!
    $status: String
    $invite_url: String
  ) {
    newInvitation(
      ask_id: $ask_id
      contact_id: $contact_id
      status: $status
      invite_url: $invite_url
    ) {
      id
    }
  }
`


export default props => (
  <Mutation mutation={ NEW_INVITATION }>
    {mutationNewInvitation => {
      const newInvitation = (ask_id, contact_id, status, invite_url) => {
        return mutationNewInvitation({
          variables: {
            ask_id,
            contact_id,
            status,
            invite_url,
          }
          // refetchQueries: () => [{ query: GET_USER_ASKS }]
        })
      }
      const { children, ...otherProps } = props
      const InnerComponent = React.cloneElement(children, {
        ...otherProps,
        newInvitation
      })

      return InnerComponent
    }}
  </Mutation>
)
