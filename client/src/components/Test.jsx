import DeleteAskWrapper from '../graphql/mutations/delete_ask_wrapper'
import GetUserAnsweringWrapper from '../graphql/queries/get_user_answering_wrapper'
import GetUserAsksWrapper from '../graphql/queries/get_user_asks_wrapper'
import NewAskWrapper from '../graphql/mutations/new_ask_wrapper'
import CurrentUserWrapper from '../graphql/queries/current_user_wrapper'
import React from 'react'

const MyRealInnerComponent = props => {
  const ask = props.user_asks[0]
  // console.log(ask.id)
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
    <NewAskWrapper>
      <GetUserAnsweringWrapper user_id="5d1a4565c5cf400f8cfcfeba">
        <DeleteAskWrapper>
          <GetUserAsksWrapper user_id="5d1a4565c5cf400f8cfcfeba">
            <MyRealInnerComponent />
          </GetUserAsksWrapper>
        </DeleteAskWrapper>
      </GetUserAnsweringWrapper>
    </NewAskWrapper>
  </CurrentUserWrapper>
)
