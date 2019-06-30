import './AskQuestion.css'

import React, { Component } from 'react'

import { ApolloConsumer } from 'react-apollo'
import AskDropdown from './AskDropdown'
import { FETCH_ASK_DETAILS } from '../../graphql/queries/ask_queries'
import { Query } from 'react-apollo'
import Toggle from 'react-toggle'
import { withRouter } from 'react-router-dom'

class AskQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      askQuestion: this.props.data.askQuestion,
      askUseDate: this.props.data.askUseDate
    }
    this.toggle = this.toggle.bind(this)
  }

  updateCache(client) {
    client.writeData({
      data: {
        askQuestion: this.state.askQuestion,
        askUseDate: this.state.askUseDate
      }
    })
    console.log(client.cache.data.data.ROOT_QUERY)
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
            <div className="ask-question-container background">
              <div className="ask-question-title section-header">Ask</div>
              <textarea
                className="ask-question-field"
                onChange={this.update('askQuestion')}
                value={this.state.askQuestion}
                placeholder="ex: Where are we going for dinner?"
              />
              <div className="ask-question-as drop-shadow button">
                <div style={{ flex: 1 }}>
                  <AskDropdown currentSelection={this.props.data.askAskingAs} />
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

const WithExistingAnswers = ({ history }) => (
  <Query query={FETCH_ASK_DETAILS}>
    {({ data }) => {
      return <AskQuestion data={data} history={history} />
    }}
  </Query>
)

export default withRouter(WithExistingAnswers)
