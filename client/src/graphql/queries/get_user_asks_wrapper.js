import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

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

export default props => (
  <Query query={GET_USER_ASKS} variables={{ id: props.user_id }}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      const user_asks = data.user.asks

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        user_asks
      })

      return innerComponent
    }}
  </Query>
)
