import React, { Fragment, useEffect } from "react";
import AccountList from "./AccountList";
import Chart from "../chart/Chart";
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

Dashboard.propTypes = {
  getAccounts: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAccounts })(Dashboard);
