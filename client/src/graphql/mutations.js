import gql from 'graphql-tag';

const Mutations = {
  
  REGISTER_USER: gql`
    mutation RegisterUser($phone_number: String!, $password: String! $name: String!) {
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


}

export default Mutations