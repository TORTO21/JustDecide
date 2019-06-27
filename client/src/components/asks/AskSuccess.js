import React from 'react';
import { ApolloConsumer, Query } from 'react-apollo';
import './AskSuccess.css';
import { FETCH_ASK_DETAILS } from '../../graphql/mutations/user_mutations';
import PinkCheck from '../../components/icons/PinkCheck.png';

class AskSuccess extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return( 
      <ApolloConsumer>
        {client => (
          <Query query={FETCH_ASK_DETAILS}>
            {({ data }) => {
              console.log(data.askOptions)
              let options = data.askOptions.map((option, i) => {
                return (
                  <li key={i} className="invitee-li">
                    {option}
                    <img src={PinkCheck} className="success-pink-check"></img>
                  </li>
                )
              })
              
              return(
                <div className="background">
                  <div className="overall-container">
                    <div className="top-container">
                      <div className="section-header">Success!</div>
                      <div className="ask-details">Ask Details go here</div>
                    </div>
                    <div className="lower-container">
                      <div className="ask-time drop-shadow">Ask time goes here</div>
                      <div className="ask-invitees-list">
                        <ul className="ask-invitees-ul">
                          {options}
                        </ul>
                      </div>
                      <button className="solid-pink-button">Ask!</button>
                    </div>
                  </div>
                </div>
              )
            }} 
          </Query>
        )}
      </ApolloConsumer>
    )
  }
}

export default AskSuccess;