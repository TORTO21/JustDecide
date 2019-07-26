import { GET_USER_CONTACTS } from '../queries/get_user_contacts_wrapper'
import { Mutation } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const NEW_CONTACT = gql`
  mutation NewContact($name: String!, $owner_id: ID!, $phone_number: String!) {
    newContact(name: $name, owner_id: $owner_id, phone_number: $phone_number) {
      id
      name
      phone_number
    }
  }
`

export default props => {
  return (
    <Mutation mutation={NEW_CONTACT}>
      {mutationNewContact => {
        const newContact = ({ owner_id, name, phone_number }) => {
          return mutationNewContact({
            variables: {
              owner_id,
              name,
              phone_number
            },
            refetchQueries: () => [
              { query: GET_USER_CONTACTS, variables: { id: owner_id } }
            ]
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
}
