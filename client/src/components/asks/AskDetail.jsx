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
          <>
            <div
              className="background vertical-flex"
              style={{
                position: 'relative'
              }}
            >
              <div
                className="section-header"
                style={{
                  textAlign: 'center',
                  fontSize: 41,
                  lineHeight: '43px'
                }}
              >
                {ask.question}
              </div>
              <div
                style={{
                  background: 'white',
                  marginTop: 44,
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -38,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <Countdown deadline={parseInt(ask.deadline)} />
                </div>
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
            </div>
            {showAddOption && (
              <NewOption cancel={() => setShowAddOption(false)} ask={ask} />
            )}
          </>
        )
      }}
    </Query>
  )
}

export default AskDetail
