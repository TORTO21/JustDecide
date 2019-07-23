import CurrentUserWrapper from '../graphql/queries/current_user_wrapper'
import DeleteAskWrapper from '../graphql/mutations/delete_ask_wrapper'
import GetUserAnsweringWrapper from '../graphql/queries/get_user_answering_wrapper'
import GetUserAsksWrapper from '../graphql/queries/get_user_asks_wrapper'
import IsLoggedInWrapper from '../graphql/queries/is_logged_in_wrapper'
import NewAskWrapper from '../graphql/mutations/new_ask_wrapper'
import React from 'react'

const MyRealInnerComponent = props => {
  const ask = props.user_asks[0]
  return (
    <div>
      <h1>Hello</h1>
      <p>
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
      {console.log(props)}
      <button onClick={() => props.deleteAsk(ask.id)}>DeleteAsk</button>
    </div>
  )
}

export default props => (
  <CurrentUserWrapper>
    <IsLoggedInWrapper>
      <NewAskWrapper>
        <GetUserAnsweringWrapper>
          <DeleteAskWrapper>
            <GetUserAsksWrapper>
              <MyRealInnerComponent />
            </GetUserAsksWrapper>
          </DeleteAskWrapper>
        </GetUserAnsweringWrapper>
      </NewAskWrapper>
    </IsLoggedInWrapper>
  </CurrentUserWrapper>
)
