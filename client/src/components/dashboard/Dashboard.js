import React, { Fragment } from "react";
import AccountList from './AccountList'
import TransactionList from "./TransactionList";

const Dashboard = () => {
  return (
    <Fragment>
      <div className="container">
        <h1>Dashboard</h1>
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
          <span className="ps-2"><a href="!#" className="text-dark">Janina Ranta-aho</a></span>
      </div>
      {/* FRAGMENT FOR ACCOUNT LIST */}
      <Fragment>
        <div className="container">
        <AccountList />
        <hr />
        <h2 className="mt-5">All User Transactions</h2>
        <TransactionList />
        </div>
      </Fragment>
    </Fragment>
  );
};

export default Dashboard;
