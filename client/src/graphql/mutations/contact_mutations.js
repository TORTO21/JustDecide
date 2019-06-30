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
