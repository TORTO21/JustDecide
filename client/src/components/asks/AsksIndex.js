import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom'
import dateFns from 'date-fns';
import { GET_ASKS } from '../../graphql/queries/ask_queries';
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
    // let askGradient;
    // let answeringGradient;
    // if (this.state.asks === true) {
    //   askGradient = (
    //     <div className={`gradient-bar 
    //       ${this.state.asks ? "" : "hidden"}`} 
    //       onClick={this.toggleHeaders}></div>
    //     )
    //   } else {
    //   answeringGradient = (          
    //     <div className={`gradient-bar
    //       ${this.state.answering ? "" : "hidden"}`} 
    //       onClick={this.toggleHeaders}></div>
    //   )
    // }
    return (
      <Query query={GET_ASKS}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          let asks = data.asks.map(ask => {
            let date = this.formatDate(ask.date)
            let time = this.formatTime(ask.date)
            return (
              <li 
                key={ask.id}
                className="asks-li drop-shadow"
                onClick={console.log(ask.question)}>
                <span className="ask-question">{ask.question}</span>
                <div className="ask-date">{date}</div>
                <div className="ask-time">{time}</div>
              </li>
            )
          })
          return (
            <div className="background">
              <div className="outer-container">
                <div className="top-container">
                  <div className="section-header">Just Decide</div>
                  <button
                    className="asks-index-button button"
                    onClick={() => this.props.history.push("/asks/new")} >
                    Create an Ask
                  </button>
                  <div className="index-header-container">
                    <div className="container">
                      <div 
                        className="index-headers"
                        onClick={this.toggleHeaders}>
                        Asks
                      </div>
                      {/* {askGradient} */}
                      <div className={`gradient-bar 
                        ${this.state.asks ? "" : "hidden"}`}
                        onClick={this.toggleHeaders}></div>
                    </div>
                    <div className="container">
                      <div 
                        className="index-headers"
                        onClick={this.toggleHeaders}>
                        Answering
                      </div>
                      {/* {answeringGradient} */}
                      <div className={`gradient-bar
                        ${this.state.answering ? "" : "hidden"}`}
                        onClick={this.toggleHeaders}></div>
                    </div>
                  </div>
                </div>
                <div className="lower-container">
                  <ul className="asks-ul">
                    {asks}
                  </ul>
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(AsksIndex);