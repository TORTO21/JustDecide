import { Query } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const ANSWER_COUNT = gql`
  query {
    answerCount @client
  }
`
export default props => (
  <Query query={ANSWER_COUNT}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(error)
        return null
      }
      if (loading) return null

      const { answerCount } = data

      const { children, ...otherProps } = props
      const innerComponent = React.cloneElement(children, {
        ...otherProps,
        answerCount
      })

      return innerComponent
    }}
  </Query>
)
