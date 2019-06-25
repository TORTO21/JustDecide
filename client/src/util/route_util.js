import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const AuthRoute = ({
  component: Component,
  path,
  exact,
  routeType,
  ...rest
}) => (
  <Query query={ IS_LOGGED_IN }>
    {({ data }) => {
      // renders if logged in
      if (routeType === "auth") {
        return (
          <Route
            path={path}
            exact={exact}
            render={ props =>
              !data.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
            }
          />
        );
      } else {
        // renders if logged in
        return (
          <Route
            {...rest}
            render={ props =>
              data.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
            }
          />
        );
      }
    }}
  </Query>
);

export default AuthRoute;