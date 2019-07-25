import gql from 'graphql-tag'

export const FETCH_ASK_DETAILS = gql`
  query {
    askQuestion @client
    askUseDate @client
    # askAskingAs @client {
    #   id
    #   name
    #   user {
    #     id
    #   }
    # }
    askAskingAsId @client
    askAskingAsName @client

    askDate @client
    askDeadline @client
    askOptions @client
    askInvitees @client
  }
`

// export const GET_ASK = gql`
//   query getAsk($id: ID!) {
//     ask(id: $id) {
//       id
//       author {
//         id
//       }
//       name_used {
//         name
//       }
//       question
//       use_date
//       use_time
//       date
//       deadline
//       invitations {
//         id
//         contact {
//           phone_number
//           id
//           user {
//             id
//           }
//           name
//         }
//       }
//       options {
//         id
//         creator {
//           user {
//             id
//           }
//           name
//         }
//         title
//         votes {
//           id
//           contact {
//             phone_number
//             user {
//               id
//             }
//             name
//           }
//           direction
//         }
//       }
//     }
//   }
// `

// export const GET_ASKS = gql`
//   {
//     asks {
//       question
//       date
//     }
//   }
// `

// this isn't commented out, because the import of this in new_ask_wrapper will cause errors
// but it already has a wrapper in get_user_asks_wrapper
export const GET_USER_ASKS = gql`
  query getUserAsks($id: ID!) {
    user(id: $id) {
      asks {
        question
        date
        id
      }
    }
  }
`

// this isn't commented out, because the import of this in new_ask_wrapper will cause errors
// but it already has a wrapper in get_user_answering_wrapper
export const GET_USER_ANSWERING = gql`
  query getUserAnswering($id: ID!) {
    user(id: $id) {
      phone_number
      id
      invited {
        ask {
          question
          date
          id
        }
      }
    }
  }
`
export const BADGE_COUNT = gql`
  query {
    askCount @client
    answeringCount @client
  }
`
