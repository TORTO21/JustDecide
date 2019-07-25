import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

// export const GET_ANSWERS = gql`
//   query FindAnswers($user_id: ID!) {
//     user(id: $user_id) {
//       votes {
//         option {
//           ask {
//             question
//             date
//           }
//         }
//       }
//     }
//   }
// `
// export default props => (
//   <Query query={GET_ANSWERS} variables={{ id: props.currentUserId }}>
//     {({ loading, error, data }) => {
//       if (error) {
//         console.error(error)
//         return null
//       }
//       if (loading) return null

//       const user_asks = data.user.asks

//       const { children, ...otherProps } = props
//       const innerComponent = React.cloneElement(children, {
//         ...otherProps,
//         user_asks
//       })

//       return innerComponent
//     }}
//   </Query>
// )