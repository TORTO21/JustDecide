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
    //   asks: true,
    //   answering: false
    // }
    // this.toggleHeaders = this.toggleHeaders.bind(this)
  }



  // toggleHeaders() {
  //   if (this.state.asks === true) {
  //     this.setState({
  //       asks: false,
  //       answering: true
  //     })
  //   } else {
  //     this.setState({
  //       asks: true,
  //       answering: false
  //     })
  //   }
  // }

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

  updateWindow(answeringCount) {
    window.localStorage.setItem('answeringCount', answeringCount)
  }

  render() {
    const user_id = window.localStorage.getItem('current-user')
    return(
      <ApolloConsumer>
        {client => {
          return (
            <Query query={GET_USER_ANSWERING} variables={{ id: user_id }}>
              {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                let answeringCount = data.user.invited.length
                this.updateWindow(answeringCount)

                let asks = data.user.invited.map(invite => {
                  let date = this.formatDate(invite.ask.date)
                  let time = this.formatTime(invite.ask.date)
                  return (
                    <li
                      key={invite.id}
                      className="asks-li drop-shadow"
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
              }}
            </Query>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default withApollo(AnswersIndex);