import AskSummaryPanel from './AskSummaryPanel'
import Countdown from './Countdown'
import { Link } from 'react-router-dom'
import NotInterestedButton from './NotInterestedButton'
import OptionsList from './OptionsList'
import Queries from '../../graphql/queries'
import { Query } from 'react-apollo'
import React from 'react'

const { GET_ASK } = Queries

const AppDetail = props => {
  const id = props.match.params.ask_id

  return (
    <Query query={GET_ASK} variables={{ id }}>
      {({ loading, data: { ask } }) => {
        if (loading) return <div>Loading...</div>

        return (
          <div
            className="background vertical-flex"
            style={{
              position: 'relative'
            }}
          >
            <div
              className="section-header"
              style={{ textAlign: 'center', fontSize: 41, lineHeight: '43px' }}
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
              <OptionsList options={ask.options} />
              <NotInterestedButton
                invitations={ask.invitations}
                history={props.history}
              />
              <Link to={`/asks/${ask.id}/new-option`}>
                <button
                  className="solid-pink-button"
                  style={{
                    marginTop: 17
                  }}
                >
                  Something Else
                </button>
              </Link>
              <AskSummaryPanel ask={ask} />
            </div>
          </div>
        )
      }}
    </Query>
  )
}

export default AppDetail
