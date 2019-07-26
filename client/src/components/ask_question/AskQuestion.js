import './AskQuestion.css'

import React, { Component } from 'react'

import { ApolloConsumer } from 'react-apollo'
import AskDropdown from './AskDropdown'
import { NEW_ASK_DETAILS } from '../../graphql/queries/new_ask_details_wrapper'
import NewAskDetailsWrapper from '../../graphql/queries/new_ask_details_wrapper'
import Toggle from 'react-toggle'
import { gql } from 'graphql-tag'
import { withRouter } from 'react-router-dom'

class AskQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      askQuestion: this.props.newAsk.askQuestion,
      askUseDate: this.props.newAsk.askUseDate
    }
    this.toggle = this.toggle.bind(this)
  }

  updateCache(client) {
    const { newAsk } = client.readQuery({ query: NEW_ASK_DETAILS })

    client.writeData({
      data: {
        newAsk: {
          ...newAsk,
          askQuestion: this.state.askQuestion,
          askUseDate: this.state.askUseDate
        }
      }
    })
  }

  handleNext(client) {
    this.updateCache(client)
    if (this.state.askUseDate) {
      this.props.history.push('/selectDate')
    } else {
      this.props.history.push('/deadlineDate')
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  toggle() {
    this.setState({ askUseDate: !this.state.askUseDate })
  }

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <div className="ask-question-container">
              <div className="ask-question-title section-header">Ask</div>
              <textarea
                className="ask-question-field"
                onChange={this.update('askQuestion')}
                value={this.state.askQuestion}
                placeholder="ex: Where are we going for dinner?"
              />
              <div className="ask-question-as drop-shadow button">
                <div style={{ flex: 1 }}>
                  <AskDropdown
                    // currentSelection={this.props.newAsk.askAskingAs}
                    {...this.props}
                  />
                </div>
              </div>
              <div className="ask-question-date-time-container">
                <div className="ask-question-date-time-title">
                  Do you want to set a date or time?
                </div>
                <div className="ask-question-date-time">
                  <Toggle
                    defaultChecked={this.state.askUseDate}
                    icons={false}
                    onChange={this.toggle}
                    className={this.state.askUseDate ? `yes` : `no`}
                  />
                </div>
              </div>
              <div className="ask-question-button">
                <button
                  className="solid-pink-button button"
                  onClick={() => this.handleNext(client)}
                >
                  Next
                </button>
              </div>
            </div>
          )
        }}
      </ApolloConsumer>
    )
  }
}

const AskQuestionPage = withRouter(AskQuestion)

export default () => (
  <NewAskDetailsWrapper>
    <AskQuestionPage />
  </NewAskDetailsWrapper>
)
