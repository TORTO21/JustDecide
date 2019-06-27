import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { Query } from 'mongoose';

import AskQuestion from './AskQuestion'

import Queries from '../../graphql/queries'
const { QUERY_PAGE } = Queries

export class NewAsk extends Component {
  render() {
    return (
      <div>
        <div>
          <AskQuestion />
        </div>
        <div>
          {/* <Query
            query={ QUERY_PAGE }>
              { page => {
                switch (page) {
                  case 1: return <AskQuestion />
                  case 2: return <AskDateTime />
                  case 3: return <AskDeadline />
                  case 4: return <AskOptions />
                  case 5: return <AskInvites />
                  case 6: return <AskSuccess />
                  default: return <Redirect to="/" />
                }
              }}

          </Query> */}
        </div>
      </div>
    )
  }
}

export default NewAsk
