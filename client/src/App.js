import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Account from './components/account/Account'

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path='/account'>
            <Account />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
