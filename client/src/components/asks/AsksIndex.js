import React from 'react';
import { Query, withApollo, ApolloConsumer, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom'
import dateFns from 'date-fns';
import { GET_USER_ASKS, GET_ASKS } from '../../graphql/queries/ask_queries';
import { DELETE_ASK } from '../../graphql/mutations/delete_ask_wrapper';
import { GET_VOTES } from '../../graphql/queries/votes_queries';
import Votes from './Votes.js'
import './AsksIndex.css';
import TrashIcon from '../icons/Trash.png';

class AsksIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteModal: false,
      deleteAskId: null
    }
    this.detailClick = this.detailClick.bind(this)
    this.handleTrash = this.handleTrash.bind(this)
    this.updateCache = this.updateCache.bind(this)
    this.detailClick = this.detailClick.bind(this)
  }

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

  updateCache(client, askCount) {
    client.writeData({
      data: { askCount: askCount }
    })
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

  handleDelete(e, mutation, idToDelete) {
    e.preventDefault();
    mutation({ variables: {id: idToDelete} })
  }

  closeModal() {
    this.setState({ showDeleteModal: false })
  }

  render() {

    const user_id = window.localStorage.getItem('current-user')
    let deleteModal;

    return(
      <>
        <Mutation mutation={DELETE_ASK}
        onCompleted={() => this.closeModal()}
        refetchQueries={[{query: GET_USER_ASKS, variables: {id: user_id}}]}>
          {(DeleteAsk, { data }) => {
            let asks = this.props.data.user.asks.map(ask => {
              let date = this.formatDate(ask.date)
              let time = this.formatTime(ask.date)
              console.log(ask.id)
              return (

                <li
                  key={ask.id}
                  className="asks-li index-drop-shadow"
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

            if (this.state.showDeleteModal) {
              const idToDelete = this.state.deleteAskId
              
              deleteModal = (
                <div className="delete-modal drop-shadow">
                  <div className="modal-gradient"></div>
                  <div className="delete-confirm-message">
                    Are you sure you want to delete this ask?
                  </div>
                  <div className="yes-no-button-container">
                    <button 
                      className="solid-pink-button yes-button"
                      onClick={e => this.handleDelete(e, DeleteAsk, idToDelete) }>
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
              deleteModal = null
            }
            return (
              <>
                {deleteModal}
                <ul className="asks-ul" >
                  {asks}
                </ul>
              </>
            )
          }}
        </Mutation>
      </>
    )
  }
}

export default withApollo(AsksIndex);