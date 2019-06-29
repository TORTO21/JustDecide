import './AskConfirm.css'

import { ApolloConsumer, Query } from 'react-apollo'

import Countdown from './Countdown'
import { FETCH_ASK_DETAILS } from '../../graphql/queries/user_queries'
import PinkCheck from '../../components/icons/PinkCheck.png'
import React from 'react'
import dateFns from 'date-fns'

class AskConfirm extends React.Component {
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={FETCH_ASK_DETAILS}>
            {({ data }) => {
              console.log(data.askOptions)
              let options = data.askOptions.map((option, i) => {
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

              let milliseconds = new Date(data.deadlineDate).getTime()

              return (
                <div className="background">
                  <div className="overall-container">
                    <div className="top-container">
                      <div className="section-header">Confirm!</div>
                      <div className="ask-details-container">
                        <div className="ask-details">
                          Where do you want to go to dinner?
                        </div>
                        <div className="date-time-group">
                          <div className="ask-date">{date}</div>
                          <div className="ask-time">{time}</div>
                        </div>
                      </div>
                    </div>
                    <div className="lower-container">
                      <div className="ask-deadline-counter">
                        <Countdown deadline={milliseconds} />
                      </div>
                      <div className="ask-invitees-list">
                        <ul className="ask-invitees-ul">{options}</ul>
                      </div>
                      <button className="ask-button solid-pink-button">
                        Ask!
                      </button>
                    </div>
                  </div>
                </div>
              )
            }}
          </Query>
        )}
      </ApolloConsumer>
    )
  }
}

export default AskConfirm
