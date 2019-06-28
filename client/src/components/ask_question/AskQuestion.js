import React, { Component } from "react";
import gql from 'graphql-tag'
import { Query, ApolloConsumer } from "react-apollo";
import AskDropdown from './AskDropdown'
import './AskQuestion.css'


class AskQuestion extends Component {

  render() {
    // debugger
    return (
      <ApolloConsumer>
        { client => {
          return(
            <div className="ask-question-container background">
              <div className="ask-question-title section-header" >Ask</div>
              <textarea className="ask-question-field" />
              <AskDropdown />
              <div className="ask-questio-date-time-container">
                <div className="ask-question-date-time-title">
                  Do you want to set a date or time?
                </div>
                <div className="ask-question-date-time">
                  TOGGLE
                  {/* <Toggle /> */}
                </div>
              </div>
              <div className="ask-question-button">
                <button className="solid-pink-button button">Next</button>
              </div>
            </div>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default AskQuestion
