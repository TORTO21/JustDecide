import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const Logout = props => {
  console.log(props)
  return (
    <ApolloConsumer>
      { clientCache => (
        <Query query={ IS_LOGGED_IN }>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div>
                  <button
                    onClick={ e => {
                      e.preventDefault();
                      localStorage.removeItem("auth-token");
                      clientCache.writeData({ data: { isLoggedIn: false } });
                      props.history.push("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              );
            } else {
              return null
              // (
              //   <div>
              //     <Link to="/">Home</Link>
              //     <Link to="/login">Login</Link>
              //     <Link to="/register">Register</Link>
              //   </div>
              // );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Logout);