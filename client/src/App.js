import "./App.css";
import React, { Fragment } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/layout/Header"
import Navbar from "./components/layout/Navbar"

function App() {
  return (
    <Fragment>
      <Header />
      <Navbar />
      <Dashboard />
    </Fragment>
  );
}

export default App;
