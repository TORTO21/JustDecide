import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import './AskOption.css';

class AskOption extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="background">
        <div className="">
          <div className="top-container">
            <div className="section-header ask-option-header">Is this a yes or no question?</div>
            <div>toggle</div>
          </div>
          <div className="lower-container">
            <input
              className="option-input drop-shadow"
              placeholder="option">
            </input>
            <button
              className="add-button green-gradient">
              Add Option
            </button>
            <button
              className="continue-button solid-pink-button">
              Continue
            </button>
            <ul className="option-list-view drop-shadow">
              List view
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default AskOption;