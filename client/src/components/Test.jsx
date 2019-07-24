import AnswerCountWrapper from '../graphql/queries/answer_count_wrapper'
import CurrentUserWrapper from '../graphql/queries/current_user_wrapper'
import DeleteAskWrapper from '../graphql/mutations/delete_ask_wrapper'
import GetUserAnsweringWrapper from '../graphql/queries/get_user_answering_wrapper'
import GetUserAsksWrapper from '../graphql/queries/get_user_asks_wrapper'
// import VotesQueriesWrapper from '../graphql/queries/votes_queries'
import GetUserContactsWrapper from '../graphql/queries/get_user_contacts_wrapper'
import IsLoggedInWrapper from '../graphql/queries/is_logged_in_wrapper'
import NewAskDetailsWrapper from '../graphql/queries/new_ask_details_wrapper'
import React from 'react'
import SaveNewAskWrapper from '../graphql/mutations/new_ask_wrapper'

const MyRealInnerComponent = props => {
  // const ask = props.user_asks[0]
  return (
    <div>
      <h1>Hello</h1>
      {/* <p>
        {props.deleteAsk
          ? 'deleteAsk available here (from DeleteAskWrapper)'
          : ''}
      </p>
      <p>
        {props.user_asks
          ? 'user_asks available here (from GetUserAsksWrapper)'
          : ''}
      </p>
      <p>
        {props.user_answering
          ? 'user_answering available here (from GetUserAnsweringWrapper)'
          : ''}
      </p>
      <p>See console log</p>
      <button onClick={() => props.deleteAsk(ask.id)}>DeleteAsk</button> */}
      {console.log(props)}
    </div>
  )
}

export default props => (
  <CurrentUserWrapper>
    <AnswerCountWrapper>
      <IsLoggedInWrapper>
        <GetUserContactsWrapper>
          {/* <VotesQueriesWrapper> */}
          <SaveNewAskWrapper>
            <GetUserAnsweringWrapper>
              <DeleteAskWrapper>
                <GetUserAsksWrapper>
                  <NewAskDetailsWrapper>
                    <MyRealInnerComponent />
                  </NewAskDetailsWrapper>
                </GetUserAsksWrapper>
              </DeleteAskWrapper>
            </GetUserAnsweringWrapper>
          </SaveNewAskWrapper>
        </GetUserContactsWrapper>
        {/* </VotesQueriesWrapper> */}
      </IsLoggedInWrapper>
    </AnswerCountWrapper>
  </CurrentUserWrapper>
)
