import gql from 'graphql-tag'

const Mutations = {
  REGISTER_USER: gql`
    mutation RegisterUser(
      $phone_number: String!
      $password: String!
      $name: String!
    ) {
      register(phone_number: $phone_number, password: $password, name: $name) {
        token
        loggedIn
      }
    }
  `,

  LOGOUT_USER: gql`
    mutation LogoutUser($id: String!) {
      logout(id: $id)
      token
      loggedIn
    }
  `,

  LOGIN_USER: gql`
    mutation LoginUser($phone_number: String!, $password: String!) {
      login(phone_number: $phone_number, password: $password) {
        token
        loggedIn
      }
    }
  `,

  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,

  DELETE_INVITATION: gql`
    mutation DeleteInvitation($id: ID!) {
      deleteInvitation(id: $id) {
        id
      }
    }
  `,

  NEW_VOTE: gql`
    mutation NewVote($option_id: ID!, $contact_id: ID!, $direction: String!) {
      newVote(
        option_id: $option_id
        contact_id: $contact_id
        direction: $direction
      ) {
        id
      }
    }
  `,

  UPDATE_VOTE: gql`
    mutation UpdateVote($id: ID!, $direction: String!) {
      updateVote(id: $id, direction: $direction) {
        id
      }
    }
  `
}

export default Mutations
