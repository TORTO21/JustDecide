import React from 'react'
import { Redirect } from 'react-router-dom'
import { Query } from 'mongoose';
import Queries from '../../graphql/queries'
const { QUERY_PAGE } = Queries

function NewAsk () {
  return (
    <div>
      <Query
        query={ QUERY_PAGE }> {/* returns what page it's on */}>
          { page => {
            switch (page) {
              case 1: return <AskQuestion />
              case 2: return <AskDateTime />
              case 3: return <AskDeadline />
              case 4: return <AskInvites />
              case 5: return <AskSuccess />
              default: return <Redirect to="/" />
            }
          }}

      </Query>
    </div>
  )
}

export default NewAsk
