import React from 'react';
import { Query, withApollo, ApolloConsumer, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom'
import dateFns from 'date-fns';
import { GET_USER_ASKS, GET_ASKS } from '../../graphql/queries/ask_queries';
import { DELETE_ASK } from '../../graphql/mutations/ask_mutations';
import { GET_VOTES } from '../../graphql/queries/votes_queries';
import Votes from './Votes.js'
import './AsksIndex.css';
import TrashIcon from '../icons/Trash.png';

class AsksIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteModal: false
    }
    // this.toggleHeaders = this.toggleHeaders.bind(this)
    this.detailClick = this.detailClick.bind(this)
    this.handleTrash = this.handleTrash.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  // toggleHeaders() {
  //   if (this.state.asks === true) {
  //     this.setState({
  //       asks: false,
  //       answering: true
  //     })
  //   } else {
  //     this.setState({
  //       asks: true,
  //       answering: false 
  //     })
  //   }
  // }

  formatDate(date) {
    let d = new Date(parseInt(date))
    let dateFormat = "MMMM DD, YYYY"
    return dateFns.format(d, dateFormat)
  }

  formatTime(date) {
    let d = new Date(parseInt(date))
    let timeFormat = "hh:mm A"
    return dateFns.format(d, timeFormat)
  }

  detailClick(ask_id) {
    this.props.history.push(`/asks/${ask_id}`)
  }

  updateWindow(askCount) {
    window.localStorage.setItem('askCount', askCount)
  }

  handleTrash(e, ask_id) {
    e.stopPropagation()
    if (this.state.showDeleteModal) {
      this.setState({ 
        showDeleteModal: false 
    })
    } else {
      this.setState({ 
        showDeleteModal: true,
        deleteAskId: ask_id
      })
    }
  }

  handleDelete(e, mutation) {
    e.preventDefault();
    mutation({ variables: this.state.deleteAskId })
  }

  render() {
    const user_id = window.localStorage.getItem('current-user')

    return(
      <>
      <Mutation mutation={DELETE_ASK}
        onCompleted={() => this.handleTrash}>
          {(deleteAsk, { data }) => {
            if (this.state.showDeleteModal) {
              return (
                <div className="delete-modal drop-shadow">
                  <div className="modal-gradient"></div>
                  <div className="delete-confirm-message">
                    Are you sure you want to delete this ask?
                  </div>
                  <div className="yes-no-button-container">
                    <button 
                      className="solid-pink-button yes-button"
                      onClick={e => this.handleDelete(e, deleteAsk) }>
                      Yes
                    </button>
                    <button 
                      className="solid-pink-button no-button"
                      onClick={e => this.handleTrash(e)}>
                      No
                    </button>
                  </div>
                </div>
              )
            } else {
              return null
            }
          }}
        </Mutation>
        <ApolloConsumer>
          {client => {
              return (
                <Query query={GET_USER_ASKS} variables={{id: user_id}}>
                  {({ loading, error, data}) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                      let askCount = data.user.asks.length
                      this.updateWindow(askCount)
          
                      let asks = data.user.asks.map(ask => {
                        let date = this.formatDate(ask.date)
                        let time = this.formatTime(ask.date)
          
                        return (
                          <li
                            key={ask.id}
                            className="asks-li drop-shadow"
                            onClick={() => this.detailClick(ask.id)}>
                            <div className="ask-question">{ask.question}</div>
                            <div className="ask-date">{date}</div>
                            <div className="ask-time">{time}</div>
                            <img
                              src={TrashIcon}
                              className="trash-icon"
                              onClick={e => this.handleTrash(e, ask.id)}>
                            </img>
                          </li>
                        )
                      })
                      return (
                        <ul className = "asks-ul">
                          {asks}
                        </ul>
                      )             
                  }}
                </Query>
              )
          }}
        </ApolloConsumer>
      </>
    )
  }
}

export default withApollo(AsksIndex);