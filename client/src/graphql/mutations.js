import gql from 'graphql-tag'

const Mutations = {
  REGISTER_USER: gql`
    mutation RegisterUser($phone_number: String!, $password: String!) {
      register(phone_number: $phone_number, password: $password) {
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
  `
}

export default Mutations
