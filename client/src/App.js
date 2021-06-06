import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Account from "./components/account/Account";
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './components/profle/Profile'
import ChangePassword from './components/profle/ChangePassword'
// Materialize-css
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

function App() {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <Router>
      <Fragment>
        <Header />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/profile/password">
            <ChangePassword />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
