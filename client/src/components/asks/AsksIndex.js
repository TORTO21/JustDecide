import React from 'react';
import { Query, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom'
import dateFns from 'date-fns';
import { GET_USER_ASKS, GET_ASKS } from '../../graphql/queries/ask_queries';
import { GET_VOTES } from '../../graphql/queries/votes_queries';
import Votes from './Votes.js'
import './AsksIndex.css';

class AsksIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      asks: true,
      answering: false
    }
    this.toggleHeaders = this.toggleHeaders.bind(this)
  }

  toggleHeaders() {
    if (this.state.asks === true) {
      this.setState({
        asks: false,
        answering: true
      })
    } else {
      this.setState({
        asks: true,
        answering: false 
      })
    }
  }

  formatDate(date) {
    let dateFormat = "MMMM DD, YYYY"
    return dateFns.format(date, dateFormat)
  }

  formatTime(date) {
    let timeFormat = "hh:mm A"
    return dateFns.format(date, timeFormat)
  }

  render() {
    const user_id = window.localStorage.getItem('currentUserId')
    return (
      <Query query={GET_USER_ASKS} variables={{id: user_id}}>
      {/* <Query query={GET_ASKS} > */}
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
            console.log(data)
            return
            let asks = data.asks.map(ask => {
              let date = this.formatDate(ask.date)
              let time = this.formatTime(ask.date)
              return (
                <li
                  key={ask.id}
                  className="asks-li drop-shadow"
                  onClick={() => {}}>
                  <span className="ask-question">{ask.question}</span>
                  <div className="ask-date">{date}</div>
                  <div className="ask-time">{time}</div>
                  <Votes props={ask.id}/>
                </li>
              )
            })
            return (
              <ul className = "asks-ul">
                {asks}
              </ul>
            )             
        }}
      </Query>
    )
  }
}

export default withApollo(AsksIndex);