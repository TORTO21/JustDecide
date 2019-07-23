import React, { useState } from 'react'

import AskSummaryPanel from './AskSummaryPanel'
import Countdown from './Countdown'
import { GET_ASK } from '../../graphql/queries/ask_queries'
import NewOption from './NewOption'
import NotInterestedButton from './NotInterestedButton'
import OptionsList from './OptionsList'
import { Query } from 'react-apollo'

const AskDetail = props => {
  const id = props.match.params.ask_id

  const [showAddOption, setShowAddOption] = useState(false)

  return (
    <Query query={GET_ASK} variables={{ id }}>
      {({ loading, data: { ask } }) => {
        if (loading) return <div>Loading...</div>

        return (
          <div
            className="vertical-flex"
            style={{
              borderBottomLeftRadius: 26,
              borderBottomRightRadius: 26,
              overflow: 'scroll'
            }}
          >
            <div className="section-header detail">{ask.question}</div>
            <div className="detail-lower">
              <Countdown deadline={parseInt(ask.deadline)} />
              <OptionsList ask={ask} history={props.history} />
              <NotInterestedButton
                invitations={ask.invitations}
                history={props.history}
              />
              <button
                className="solid-pink-button"
                style={{
                  marginTop: 17
                }}
                onClick={() => setShowAddOption(true)}
              >
                Something Else
              </button>
              <AskSummaryPanel ask={ask} />
            </div>
            {/* {showAddOption && (
              <NewOption cancel={() => setShowAddOption(false)} ask={ask} />
            )} */}
          </div>
        )
      }}
    </Query>
  )
}

export default AskDetail
