import {
  GET_USER_ANSWERING,
  GET_USER_ASKS
} from '../../graphql/queries/ask_queries'

import AnswersIndex from './AnswersIndex'
import AsksIndex from './AsksIndex'
import { BADGE_COUNT } from '../../graphql/queries/ask_queries'
import { Query } from 'react-apollo'
import React from 'react'
import Votes from './Votes.js'
import dateFns from 'date-fns'
import { withRouter } from 'react-router-dom'

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
    const user_id = window.localStorage.getItem('current-user')

    let indexDisplay

    return (
      <Query query={GET_USER_ASKS} variables={{ id: user_id }}>
        {({
          loading: loadingAsk,
          error: errorAsk,
          data: ask,
          startPolling,
          stopPolling
        }) => (
          <Query query={GET_USER_ANSWERING} variables={{ id: user_id }}>
            {({
              loading: loadingAnswer,
              error: errorAnswer,
              data: answer,
              startPolling,
              stopPolling
            }) => {
              if (loadingAsk) return 'Loading ...'
              if (errorAsk) return `Error! ${errorAsk.message}`
              if (loadingAnswer) return 'Loading ...'
              if (errorAnswer) return `Error! ${errorAnswer.message}`

              let askCount = ask.user.asks.length
              let answeringCount = answer.user.invited.length

              if (this.state.asks) {
                console.log('rendering')
                indexDisplay = (
                  <AsksIndex data={ask} history={this.props.history} />
                )
              } else {
                indexDisplay = (
                  <AnswersIndex data={answer} history={this.props.history} />
                )
              }
              return (
                <div className="outer-container">
                  <div className="top-container">
                    <div className="section-header">Just Decide</div>
                    <button
                      className="asks-index-button button"
                      onClick={() => this.props.history.push('/asks/new')}
                    >
                      Create an Ask
                    </button>
                    <div className="index-header-container">
                      <div className="container">
                        <div
                          className="badge"
                          style={{
                            right: 10,
                            top: -10
                          }}
                        >
                          {askCount}
                        </div>
                        <div
                          className="index-headers"
                          onClick={this.toggleHeaders}
                        >
                          Asking
                        </div>
                        <div
                          className={`gradient-bar 
                              ${this.state.asks ? '' : 'hidden'}`}
                          onClick={this.toggleHeaders}
                        />
                      </div>
                      <div className="container">
                        <div className="badge">{answeringCount}</div>
                        <div
                          className="index-headers"
                          onClick={this.toggleHeaders}
                        >
                          Answering
                        </div>
                        <div
                          className={`gradient-bar
                              ${this.state.answering ? '' : 'hidden'}`}
                          onClick={this.toggleHeaders}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lower-container index">{indexDisplay}</div>
                </div>
              )
            }}
          </Query>
        )}
      </Query>
    )
  }
}

export default AskAnswerIndex
