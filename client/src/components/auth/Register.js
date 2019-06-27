import React, { Component } from 'react'

import { Mutation } from 'react-apollo'
import Mutations from '../../graphql/mutations/auth_mutations'
const { REGISTER_USER } = Mutations

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone_number: '',
      name: '',
      password: '',
      password2: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e, registerUser) {
    e.preventDefault()
    console.log(this.state.name)
    if (this.state.password === this.state.password2) {
      registerUser({
        variables: {
          phone_number: this.state.phone_number,
          name: this.state.name,
          password: this.state.password
        }
      })
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    })
  }

  render() {
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          const { token } = data.register
          localStorage.setItem('auth-token', token)
          this.props.history.push('/asks/new')
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div className="auth-container background">
            <div className="auth-form-title"> Create Your Account </div>
            <div className="auth-form-container">
              <form
                className="auth-form"
                onSubmit={e => this.handleSubmit(e, registerUser)}
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
                  <div className="auth-field-title">Name</div>
                  <input
                    className="auth-field"
                    value={this.state.name}
                    onChange={this.update('name')}
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
                <div>
                  <div className="auth-field-title">Confirm Password</div>
                  <input
                    className="auth-field"
                    value={this.state.password2}
                    onChange={this.update('password2')}
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

export default Register
