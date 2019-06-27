import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import './AskSuccess.css';

class AskSuccess extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return( 
      <div className="background">
        <div className="overall-container">
          <div className="top-container">
            <div className="section-header">Success!</div>
            <div className="ask-details">Ask Details go here</div>
          </div>
          <div className="lower-container">
            <div className="ask-time drop-shadow">Ask time goes here</div>
            <div className="ask-invitees-list">List goes here</div>
            <button className="solid-pink-button">Ask!</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AskSuccess;