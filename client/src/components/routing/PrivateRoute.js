/* Private Route checks if a user is authenticated and only then lets it access the route */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  setAlert,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
    }
  ></Route>
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
