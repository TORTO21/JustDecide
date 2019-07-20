import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

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

export default props => (
  <Query query={GET_USER_ANSWERING} variables={{ id: props.user_id }}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      const user_answering = data.user.invited

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        user_answering
      })

      return innerComponent
    }}
  </Query>
)
