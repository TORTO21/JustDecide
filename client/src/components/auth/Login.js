import './auth.css'

import { Mutation, withApollo } from 'react-apollo'
import React, { Component } from 'react'

import Mutations from '../../graphql/mutations/auth_mutations'

const { LOGIN_USER } = Mutations

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone_number: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e, loginUser) {
    e.preventDefault()
    loginUser({
      variables: {
        phone_number: this.state.phone_number,
        password: this.state.password
      }
    })
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  updateCache(cache, { data }) {
    cache.writeData({
      data: {
        isLoggedIn: data.login.loggedIn,
        currentUserId: data.login.id
      }
    })
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token, id } = data.login
          localStorage.setItem('auth-token', token)
          localStorage.setItem('current-user', id)
          this.props.history.push('/asks/new')
        }}
        update={(cache, result) => this.updateCache(cache, result)}
      >
        {loginUser => (
          <div className="auth-container">
            <div className="auth-form-title"> Login </div>
            <div className="auth-form-container">
              <form
                className="auth-form"
                onSubmit={e => this.handleSubmit(e, loginUser)}
              >
                <div>
                  <div className="auth-field-title">PhoneNumber</div>
                  <input
                    className="auth-field"
                    value={this.state.phone_number}
                    onChange={this.update('phone_number')}
                    type="tel"
                    placeholder="ex: 8881234567"
                  />
                </div>
                <div>
                  <div className="auth-field-title">Password</div>
                  <input
                    className="auth-field"
                    value={this.state.password}
                    onChange={this.update('password')}
                    type="password"
                  />
                </div>
                <div className="continue-button-container">
                  <button className="solid-pink-button button" type="submit">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Mutation>
    )
  }
}

export default withApollo(Login)
