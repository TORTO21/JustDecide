import gql from 'graphql-tag';

const Mutations = {
  
  REGISTER_USER: gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
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