import gql from 'graphql-tag'

export const FETCH_ASK_DETAILS = gql`
  query {
    askQuestion @client
    askUseDate @client
    askAskingAs @client {
      id
      name
      user {
        id
      }
    }
    # askOptions @client
    # askDate @client
    # deadlineDate @client
    # askInvitees @client
    # askDetails @client
  }
`

export const GET_ASK = gql`
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
