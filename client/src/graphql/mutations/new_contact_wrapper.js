import gql from 'graphql-tag'
import React from 'react';
import { Mutation } from 'react-apollo'
import { GET_USER_ASKS } from '../queries/get_user_asks_wrapper'

export const NEW_CONTACT = gql`
  mutation NewContact($name: String!, $owner_id: ID!, $phone_number: String!) {
    newContact(name: $name, owner_id: $owner_id, phone_number: $phone_number) {
      id
      name
      phone_number
    }
  }
`


export default props => (
  <Mutation mutation={ NEW_CONTACT }>
    {mutationNewContact => {
      const newContact = (owner_id, name, phone_number) => {
        return mutationNewContact({
          variables: {
            owner_id,
            name,
            phone_number
          }
          // refetchQueries: () => [{ query: GET_USER_ASKS }]
        })
      }
      const { children, ...otherProps } = props
      const InnerComponent = React.cloneElement(children, {
        ...otherProps,
        newContact
      })

      return InnerComponent
    }}
  </Mutation>
)
