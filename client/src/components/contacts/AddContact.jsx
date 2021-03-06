import React, { useState } from 'react'

import { GET_CONTACTS } from '../../graphql/queries/user_queries'
import { Mutation } from 'react-apollo'
import { NEW_CONTACT } from '../../graphql/mutations/contact_mutations'

const CreateContact = props => {
  const [phone_number, setPhoneNumber] = useState('')
  const [name, setName] = useState('')

  const owner_id = props.match.params.user_id

  return (
    <Mutation
      mutation={NEW_CONTACT}
      onCompleted={data => {
        props.history.goBack()
      }}
      refetchQueries={[{ query: GET_CONTACTS, variables: { id: owner_id } }]}
    >
      {newContact => (
        <div className="new-contact-container">
          <div className="new-contact-title"> Add Someone New</div>
          <form
            className="new-contact-form-container"
            onSubmit={e => {
              e.preventDefault()
              newContact({
                variables: {
                  owner_id,
                  name,
                  phone_number
                }
              })
            }}
          >
            <div
              className="close"
              style={{ alignSelf: 'flex-end', cursor: 'pointer' }}
              onClick={() => props.history.goBack()}
            />
            <div className="new-contact-field">
              <div className="auth-field-title">Name</div>
              <input
                className="auth-field"
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Name or nickname"
              />
            </div>
            <div
              className="new-contact-field"
              style={{
                marginTop: 10
              }}
            >
              <div className="auth-field-title">Phone (no spaces)</div>
              <input
                className="auth-field"
                value={phone_number}
                onChange={e => setPhoneNumber(e.target.value)}
                type="tel"
                placeholder="ex: 8881234567"
              />
            </div>
            <div className="continue-button-container">
              <button className="solid-pink-button button" type="submit">
                Continue
              </button>
            </div>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default CreateContact
