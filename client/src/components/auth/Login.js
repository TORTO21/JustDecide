import React, { Component } from "react";
import { Mutation } from "react-apollo";
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

  handleSubmit(e, registerUser) {
    e.preventDefault();
    registerUser({
      variables: {
        phone_number: this.state.phone_number,
        password: this.state.password
      }
    });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    console.log(data);
    client.writeData({
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
          this.props.history.push("/");
        }}
        update={ (client, data) => this.updateCache(client, data) }
      >
        { loginUser => (
          <div>
            <form
              className=""
              onSubmit={ e => this.handleSubmit(e, loginUser) }
            >
              <input
                value={this.state.phone_number}
                onChange={this.update("phone_number")}
                type="tel"
                placeholder="Phone Number"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Log In</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;