import gql from 'graphql-tag'

const Queries = {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,

  GET_ASK: gql`
    query getAsk($id: ID!) {
      ask(id: $id) {
        id
        author {
          id
        }
        name_used {
          name
        }
        question
        use_date
        use_time
        date
        deadline
        invitations {
          id
          contact {
            id
            user {
              id
            }
            name
          }
        }
        options {
          id
          creator {
            user {
              id
            }
            name
          }
          title
          votes {
            id
            contact {
              user {
                id
              }
              name
            }
            direction
          }
        }
      }
    }
  `
}

export default Queries
