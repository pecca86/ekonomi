import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Account from "./components/account/Account";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/profle/Profile";
import ChangePassword from "./components/profle/ChangePassword";
import Alert from './components/layout/Alert'
// Materialize-css
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
// REDUX
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/password" component={ChangePassword} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
