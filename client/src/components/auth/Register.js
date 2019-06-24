import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from '../../graphql/mutations'
const { REGISTER_USER } = Mutations;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone_number: "",
      password: ""
    };
  }

  handleSubmit() {
    
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, {data}) {
    console.log(data);
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={ REGISTER_USER }
        onCompleted={ data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        { registerUser => (
          <div>
            <form
              onSubmit={ e => {
                e.preventDefault();
                console.log(e)
                registerUser({
                  variables: {
                    phone_number: this.state.phone_number,
                    password: this.state.password
                  }
                });
              }}
            >
              <input
                value={ this.state.name }
                onChange={ this.update("name") }
                placeholder="Name"
              />
              <input
                value={ this.state.phone_number }
                onChange={ this.update("phone_number") }
                placeholder="Phone Number"
                type="tel"
              />
              <input
                value={ this.state.password }
                onChange={ this.update("password") }
                type="password"
                placeholder="Password"
              />
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;