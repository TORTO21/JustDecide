import { GET_ASK } from '../queries/ask_queries'
import { Mutation } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

export const NEW_OPTION = gql`
  mutation NewOption($ask_id: ID!, $creator_id: ID!, $title: String!) {
    newOption(ask_id: $ask_id, creator_id: $creator_id, title: $title) {
      id
      ask {
        id
      }
      title
    }
  }
`

export default props => (
  <Mutation mutation={NEW_OPTION}>
    {mutationNewOption => {
      const newOption = option => {
        return mutationNewOption({
          variables: { ...option },
          refetchQueries: () => [
            { query: GET_ASK, variables: { id: option.ask_id } }
          ]
        })
      }
      const { children, ...otherProps } = props
      const InnerComponent = React.cloneElement(children, {
        ...otherProps,
        newOption
      })

      return InnerComponent
    }}
  </Mutation>
)
