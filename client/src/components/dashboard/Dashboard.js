import React, { Fragment, useEffect } from "react";
import AccountList from "./AccountList";
import Chart from "../chart/Chart";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAccounts } from "../../actions/account/accountActions";

import AddAccountBtn from "./AddAccountBtn";

const Dashboard = ({ auth, account, getAccounts }) => {
  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  if (
    auth.loading ||
    account.loading ||
    !auth.isAuthenticated ||
    auth.user === null
  ) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="container">
        <h3>Dashboard</h3>
        {profileIcon}
        <span className="ps-2">
          <Link to="/profile" className="text-dark">
            {`${auth.user.firstname} ${auth.user.lastname}`}
          </Link>
        </span>
        <AddAccountBtn />
      </div>
      {/* FRAGMENT FOR ACCOUNT LIST */}
      <Fragment>
        <div className="container">
          <AccountList />
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

Dashboard.propTypes = {
  getAccounts: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAccounts })(Dashboard);
