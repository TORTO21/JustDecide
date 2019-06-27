import { NEW_VOTE, UPDATE_VOTE } from '../../graphql/mutations/vote_mutations'

import { GET_ASK } from '../../graphql/queries/ask_queries'
import { Mutation } from 'react-apollo'
import React from 'react'

export default ({ thumbClass, vote, option, contact_id, ask_id }) => {
  if (vote && vote.direction === 'up') return <div className={thumbClass} />

  if (vote) {
    return (
      <Mutation
        mutation={UPDATE_VOTE}
        refetchQueries={[{ query: GET_ASK, variables: { id: ask_id } }]}
      >
        {(updateVote, { data }) => (
          <div
            className={thumbClass}
            onClick={() =>
              updateVote({ variables: { id: vote.id, direction: 'up' } })
            }
          />
        )}
      </Mutation>
    )
  }
  return (
    <Mutation
      mutation={NEW_VOTE}
      refetchQueries={[{ query: GET_ASK, variables: { id: ask_id } }]}
    >
      {(newVote, { data }) => (
        <div
          className={thumbClass}
          onClick={() =>
            newVote({
              variables: { option_id: option.id, contact_id, direction: 'up' }
            })
          }
        />
      )}
    </Mutation>
  )
}
