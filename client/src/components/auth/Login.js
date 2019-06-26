import React, { Component } from "react";
import { Mutation } from "react-apollo";
import './auth.css'
import Mutations from '../../graphql/mutations';
const { LOGIN_USER } = Mutations;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e, loginUser) {
    e.preventDefault();
    loginUser({
      variables: {
        phone_number: this.state.phone_number,
        password: this.state.password
      }
    });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(clientCache, { data }) {
    clientCache.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={ LOGIN_USER }
        onCompleted={ data => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/new");
        }}
        update={ (clientCache, data) => this.updateCache(clientCache, data) }
      >
        { loginUser => (
          <div className="auth-container background">
            <div className="auth-form-title"> Login </div>
            <div className="auth-form-container">
              <form
                className="auth-form"
                onSubmit={ e => this.handleSubmit(e, loginUser) }
              > 
                <div>
                  <div className="auth-field-title">PhoneNumber</div>
                  <input
                    className="auth-field"
                    value={ this.state.phone_number }
                    onChange={ this.update("phone_number") }
                    type="tel"
                    placeholder="ex: 8881234567"
                  />
                </div>
                <div>
                  <div className="auth-field-title">Password</div>
                    <input
                    className="auth-field"
                    value={ this.state.password }
                    onChange={ this.update("password") }
                    type="password"
                  />
                </div>
                <div className="continue-button-container">
                  <button
                    className="solid-pink-button button"
                    type="submit">
                      Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;