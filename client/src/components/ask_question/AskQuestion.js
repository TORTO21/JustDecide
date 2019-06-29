import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { Query, ApolloConsumer } from "react-apollo";
import AskDropdown from './AskDropdown'
import Toggle from 'react-toggle';
import './AskQuestion.css'


class AskQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ask: "",
      checked: true
    }
    this.toggle = this.toggle.bind(this)
  }

  updateCache(client) {
    client.writeData({
      data: {
        ask: this.state.ask,
        dateTime: this.state.checked
      }
    })
  }

  handleNext(client) {
    this.updateCache(client)
    if (this.state.checked) {
      this.props.history.push("/selectDate")
    } else {
      this.props.history.push("/deadlineDate")
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  toggle() {
    this.state.checked === true
      ? this.setState({ checked: false })
      : this.setState({ checked: true })
  }

  render() {
    console.log(this.state.checked)
    return (
      <ApolloConsumer>
        { client => {
          return(
            <div className="ask-question-container background">
              <div className="ask-question-title section-header" >Ask</div>
              <textarea
                className="ask-question-field" 
                onChange={ this.update("ask") }
                placeholder="ex: Where are we going for dinner?"
              />
              <div className="ask-question-as drop-shadow button">
                <div style={{flex: 1}}> 
                  <AskDropdown />
                </div>
                <div className="ask-question-as-icon">
                  <svg width="22" height="22" viewBox="0 -5 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="24 / music / player-play">
                      <path id="icon" fillRule="evenodd" clipRule="evenodd" d="M43.75 10.4167L6.25002 10.4167C4.60176 10.4167 3.60626 12.2401 4.49757 13.6266L23.2476 42.7933C24.0676 44.0689 25.9324 44.0689 26.7525 42.7933L45.5025 13.6266C46.3938 12.2401 45.3983 10.4167 43.75 10.4167ZM25 37.8141L10.066 14.5834L39.934 14.5834L25 37.8141Z" fill="#979797"/>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="ask-questio-date-time-container">
                <div className="ask-question-date-time-title">
                  Do you want to set a date or time?
                </div>
                <div className="ask-question-date-time">
                  <Toggle 
                    defaultChecked={ this.state.checked }
                    icons={ false }
                    onChange={ this.toggle }
                    className={ this.state.checked === true ? `yes` : `no` } />
                </div>
              </div>
              <div className="ask-question-button">
                <button
                  className="solid-pink-button button"
                  onClick={ () => this.handleNext(client) } >
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

export default  withRouter(AskQuestion)
