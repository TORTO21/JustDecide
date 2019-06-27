import { Mutation } from 'react-apollo'
import Mutations from '../../graphql/mutations'
import Queries from '../../graphql/queries'
import React from 'react'

export default ({ thumbClass, vote, option, contact_id, ask_id }) => {
  if (vote && vote.direction === 'down') return <div className={thumbClass} />
  if (vote) {
    return (
      <Mutation
        mutation={Mutations.UPDATE_VOTE}
        refetchQueries={[{ query: Queries.GET_ASK, variables: { id: ask_id } }]}
      >
        {(updateVote, { data }) => (
          <div
            className={thumbClass}
            onClick={() =>
              updateVote({ variables: { id: vote.id, direction: 'down' } })
            }
          />
        )}
      </Mutation>
    )
  }
  return (
    <Mutation
      mutation={Mutations.NEW_VOTE}
      refetchQueries={[{ query: Queries.GET_ASK, variables: { id: ask_id } }]}
    >
      {(newVote, { data }) => (
        <div
          className={thumbClass}
          onClick={() =>
            newVote({
              variables: { option_id: option.id, contact_id, direction: 'down' }
            })
          }
        />
      )}
    </Mutation>
  )
}
