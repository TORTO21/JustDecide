import gql from 'graphql-tag'

const Queries = {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client 
    }
  `,

  CURRENT_USER_ID: gql`
    query CurrentUserId {
      currentUserId @client
    }
  `
}

export default Queries
