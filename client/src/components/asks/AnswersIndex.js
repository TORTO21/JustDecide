import React from 'react';
import { Query, withApollo, ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom'
import dateFns from 'date-fns';
import { GET_USER_ANSWERING } from '../../graphql/queries/ask_queries';
import { GET_VOTES } from '../../graphql/queries/votes_queries';
import Votes from './Votes.js'
import './AsksIndex.css';

class AnswersIndex extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   data: this.props.data
    // }
    this.updateCache = this.updateCache.bind(this)
  }


  formatDate(date) {
    let d = new Date(parseInt(date))
    let dateFormat = "MMMM DD, YYYY"
    return dateFns.format(d, dateFormat)
  }

  formatTime(date) {
    let d = new Date(parseInt(date))
    let timeFormat = "hh:mm A"
    return dateFns.format(d, timeFormat)
  }

  detailClick(ask_id) {
    this.props.history.push(`/asks/${ask_id}`)
  }

  updateCache(client, answeringCount) {
    client.writeData({
      data: { answeringCount: answeringCount }
    })
  }

  render() {
    const user_id = window.localStorage.getItem('current-user')
  
    let asks = this.props.data.user.invited.map(invite => {
      console.log(invite)
      let date = this.formatDate(invite.ask.date)
      let time = this.formatTime(invite.ask.date)
      console.log(invite)
      return (
        <li
          key={invite.ask.id}
          className="asks-li index-drop-shadow"
          onClick={() => this.detailClick(invite.ask.id)}>
          <div className="ask-question">{invite.ask.question}</div>
          <div className="ask-date">{date}</div>
          <div className="ask-time">{time}</div>
          {/* <Votes props={ask.id} /> */}
        </li>
      )
    })
    return (
      <ul className="asks-ul">
        {asks}
      </ul>
    )

  }
}

export default withApollo(AnswersIndex);