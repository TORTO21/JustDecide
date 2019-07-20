import DeleteAskWrapper from '../graphql/mutations/delete_ask_wrapper'
import GetUserAnsweringWrapper from '../graphql/queries/get_user_answering_wrapper'
import GetUserAsksWrapper from '../graphql/queries/get_user_asks_wrapper'
import React from 'react'

const MyRealInnerComponent = props => {
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
    </div>
  )
}

export default props => (
  <GetUserAnsweringWrapper user_id="5d1a458973743bcaa6a0ae53">
    <DeleteAskWrapper>
      <GetUserAsksWrapper user_id="5d1a458973743bcaa6a0ae53">
        <MyRealInnerComponent />
      </GetUserAsksWrapper>
    </DeleteAskWrapper>
  </GetUserAnsweringWrapper>
)
