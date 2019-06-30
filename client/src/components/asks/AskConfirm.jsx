import './AskConfirm.css'

import { ApolloConsumer, Query } from 'react-apollo'

import { CURRENT_USER_ID } from '../../graphql/queries/user_queries'
import Countdown from './Countdown'
import { FETCH_ASK_DETAILS } from '../../graphql/queries/ask_queries'
import { NEW_ASK } from '../../graphql/mutations/ask_mutations'
import { NEW_INVITATION } from '../../graphql/mutations/invitation_mutations'
import { NEW_OPTION } from '../../graphql/mutations/option_mutations'
import PinkCheck from '../../components/icons/PinkCheck.png'
import React from 'react'
import dateFns from 'date-fns'

const saveAll = (client, data, currentUserId, history) => {
  client
    .mutate({
      mutation: NEW_ASK,
      variables: {
        author_id: currentUserId,
        name_used_id: data.askAskingAs.id,
        question: data.askQuestion,
        use_date: data.askUseDate,
        use_time: data.askUseDate,
        date: data.askDate ? new Date(data.askDate).getTime().toString() : '',
        deadline: new Date(data.askDeadline).getTime().toString()
      }
    })
    .then(({ data: { newAsk: ask } }) => {
      JSON.parse(data.askOptions).forEach(option => {
        client.mutate({
          mutation: NEW_OPTION,
          variables: {
            creator_id: data.askAskingAs.id,
            ask_id: ask.id,
            title: option
          }
        })
      })

      data.askInvitees.forEach(invitee => {
        client.mutate({
          mutation: NEW_INVITATION,
          variables: {
            ask_id: ask.id,
            contact_id: invitee,
            status: 'open',
            invite_url: 'to-be-implemented'
          }
        })
      })

      // history.push(`/asks/${ask.id}`)
      history.push('/asks/')
    })
}

const AskConfirm = ({ data, currentUserId, history }) => {
  return (
    <ApolloConsumer>
      {client => {
        let options = JSON.parse(data.askOptions).map((option, i) => {
          return (
            <li key={i} className="invitee-li">
              {option}
              <img src={PinkCheck} className="success-pink-check" />
            </li>
          )
        })

        let arr = data.askDate.split(' ')
        let time = arr[3] + ' ' + arr[4]
        let d = new Date(data.askDate)
        let dateFormat = 'MMMM D, YYYY'
        const date = dateFns.format(d, dateFormat)

        let milliseconds = new Date(data.askDeadline).getTime()

        return (
          <div className="background">
            <div className="overall-container">
              <div className="top-container">
                <div className="section-header">Confirm!</div>
                <div className="ask-details-container">
                  <div className="ask-details">{data.askQuestion}</div>
                  {data.askUseDate && (
                    <div className="date-time-group">
                      <div className="confirm-ask-date">{date}</div>
                      <div className="confirm-ask-time">{time}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="lower-container">
                <div className="ask-deadline-counter">
                  <Countdown deadline={milliseconds} />
                </div>
                <div className="ask-invitees-list">
                  <ul className="ask-invitees-ul">{options}</ul>
                </div>
                <button
                  className="ask-button solid-pink-button"
                  onClick={() => saveAll(client, data, currentUserId, history)}
                >
                  Ask!
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </ApolloConsumer>
  )
}

const WithExistingAnswers = ({ history }) => (
  <Query query={CURRENT_USER_ID}>
    {({ data: { currentUserId } }) => (
      <Query query={FETCH_ASK_DETAILS}>
        {({ data }) => {
          return (
            <AskConfirm
              data={data}
              history={history}
              currentUserId={currentUserId}
            />
          )
        }}
      </Query>
    )}
  </Query>
)

export default WithExistingAnswers
