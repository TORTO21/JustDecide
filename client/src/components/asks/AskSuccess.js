import React from 'react';
import { ApolloConsumer, Query } from 'react-apollo';
import './AskSuccess.css';
import { FETCH_ASK_DETAILS } from '../../graphql/mutations/user_mutations';
import PinkCheck from '../../components/icons/PinkCheck.png';
import dateFns from 'date-fns'
import Countdown from './Countdown';

class AskSuccess extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return( 
      <ApolloConsumer>
        {client => (
          <Query query={FETCH_ASK_DETAILS}>
            {({ data }) => {
              console.log(data.askOptions)
              let options = data.askOptions.map((option, i) => {
                return (
                  <li key={i} className="invitee-li">
                    {option}
                    <img src={PinkCheck} className="success-pink-check"></img>
                  </li>
                )
              })

              let arr = data.askDate.split(" ")
              let time = arr[3] + " " + arr[4]
              let d = new Date(data.askDate)
              let dateFormat = "MMMM D, YYYY"
              const date = dateFns.format(d, dateFormat)

              let milliseconds = new Date(data.deadlineDate).getTime()
              
              return(
                <div className="background">
                  <div className="overall-container">
                    <div className="top-container">
                      <div className="section-header">Success!</div>
                      <div className="ask-details-container">
                        <div className="ask-details">Where do you want to go to dinner?</div>
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
                        <ul className="ask-invitees-ul">
                          {options}
                        </ul>
                      </div>
                      <button className="ask-button solid-pink-button">Ask!</button>
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

export default AskSuccess;