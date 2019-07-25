import { Query } from 'react-apollo'
import React from 'react'
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
          phone_number
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
            phone_number
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

export default props => (
  // it should be props.ask_id, but right now it's hardcoded/passed through so it's id
  <Query query={GET_ASK} variables={{ id: props.id }}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null
    
      const ask = data.ask

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        ask
      })

      return innerComponent
    }}
  </Query>
)