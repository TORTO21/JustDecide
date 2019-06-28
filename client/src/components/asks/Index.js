import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom'
import dateFns from 'date-fns';
import Votes from './Votes.js'
import AsksIndex from './AsksIndex';

class Index extends React.Component {
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

  render() {
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
                <div className="badge"></div>
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
                <div className="badge"></div>
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
              <AsksIndex />
          </div>
        </div>
      </div>
    )
  }

}

export default Index