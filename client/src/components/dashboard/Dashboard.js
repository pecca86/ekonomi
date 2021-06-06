import React, { Fragment } from "react";
import AccountList from "./AccountList";
import TransactionList from "./TransactionList";
import Chart from "../chart/Chart";
import AddAccountModal from "../account/AddAccountModal";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Fragment>
      <div className="container">
        <h3>Dashboard</h3>
        {profileIcon}
        <span className="ps-2">
          <Link to="/profile" className="text-dark">
            Janina Ranta-aho
          </Link>
        </span>
      </div>
      {/* FRAGMENT FOR ACCOUNT LIST */}
      <Fragment>
        <div className="container">
          <AccountList />
          <AddAccountModal />
          <hr />
          <Chart />
        </div>
      </Fragment>
    </Fragment>
  );
};

const profileIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-person-circle"
    viewBox="0 0 16 16"
  >
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    <path
      fillRule="evenodd"
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
    />
  </svg>
);

export default Dashboard;
