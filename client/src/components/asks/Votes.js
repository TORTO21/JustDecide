import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom'
import dateFns from 'date-fns';
import { GET_VOTES } from '../../graphql/queries/votes_queries';

// I'm pretty sure this is not being used.
const Votes = ask_id => {
  return (
    <Query query={GET_VOTES} variables={{ ask_id: ask_id }}>
      {({ loading, error, data}) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        let totalVotes = data.id
        return (
          <div>{totalVotes}</div>
        )
      }}
    </Query>
  )
}

export default Votes;