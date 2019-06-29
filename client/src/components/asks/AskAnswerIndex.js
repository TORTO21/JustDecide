import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom'
import dateFns from 'date-fns';
import Votes from './Votes.js'
import AsksIndex from './AsksIndex';
import AnswersIndex from './AnswersIndex';
import { ASK_COUNT } from '../../graphql/queries/ask_queries'

class AskAnswerIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      asks: true,
      answering: false
    }
    this.toggleHeaders = this.toggleHeaders.bind(this)
  }

  toggleHeaders() {
    if (this.state.asks) {
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

  render() {
    let indexDisplay;
    if (this.state.asks) {
      indexDisplay = (
        <AsksIndex reportCount={this.reportCount}/>
      )
    } else {
      indexDisplay = (
        <AnswersIndex />
      )
    }
    return(
      <Query query={ASK_COUNT}>
        {({ data: { askCount } }) => {
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
                      <div className="badge"
                        style={{
                          right: 10,
                          top: -10
                        }}>{window.localStorage.getItem('askCount')}</div>
                      <div
                        className="index-headers"
                        onClick={this.toggleHeaders}>
                        Asking
                      </div>
                      <div className={`gradient-bar 
                              ${this.state.asks ? "" : "hidden"}`}
                        onClick={this.toggleHeaders}></div>
                    </div>
                    <div className="container">
                      <div className="badge">{window.localStorage.getItem('answeringCount')}</div>
                      <div
                        className="index-headers"
                        onClick={this.toggleHeaders}>
                        Answering
                      </div>
                      <div className={`gradient-bar
                              ${this.state.answering ? "" : "hidden"}`}
                        onClick={this.toggleHeaders}></div>
                    </div>
                  </div>
                </div>
                <div className="lower-container">
                  {indexDisplay}
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }

}

export default AskAnswerIndex