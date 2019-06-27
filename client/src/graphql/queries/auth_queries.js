import gql from 'graphql-tag'

const Queries = {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `
}

export default Queries
