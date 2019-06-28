import gql from 'graphql-tag'

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

export const GET_ASKS = gql`
  {
    asks {
      question 
      date
    }
  }
`

export const GET_USER_ASKS = gql`
  query getUserAsks($id: ID!) {
    user(id: $id) {
      asks {
        question
        date 
        # invitations {
        #   contact {
        #     name
        #   }
        # }
      }
    }
  }
`

export const GET_USER_ANSWERING = gql`
  query getUserAnswering($id: ID!) {
    user(id: "5d110fe472d9f0614532313a") {
      phone_number
      id
      invited {
        ask {
          question
        }
      } 
    }
  }
`
