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
      <AsksIndex />
    )
  }

}

export default Index