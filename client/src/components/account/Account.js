import React, { Fragment, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TimeIntervall from "../transaction/TimeIntervall";
import AccountTransactions from "../transaction/AccountTransactions";
import AddBtn from "./AddBtn";
import AddTransactionModal from "../transaction/AddTransactionModal";
import AddTimeintervallModal from "../transaction/AddTimeintervallModal";
import DeleteAccountModal from "./DeleteAccountModal";
import EditTransactionModal from "../transaction/EditTransactionModal";
import { getAccount } from "../../actions/account/accountActions";
import {
  getTimeSpans,
  getAllAccountTransactions,
  getAllAccountTransactionsByYear,
  clearAccountTransactionsByYear,
  getTransactionCategories,
} from "../../actions/transaction/transactionActions";
import AccountDetail from "./AccountDetail";
import AccountChart from "../chart/AccountChart";
import TransactionsPerTypeChart from "../chart/TransactionsPerTypeChart";

const Account = ({
  getAccount,
  match,
  account,
  getAllAccountTransactions,
  getAllAccountTransactionsByYear,
  clearAccountTransactionsByYear,
  getTimeSpans,
  transaction,
  getTransactionCategories,
}) => {
  // Get current date that will be used in our Graph
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDate();
  let currentYear = currentDate.getFullYear();

  // Effect upon loading and when something gets changed
  useEffect(() => {
    clearAccountTransactionsByYear();
    getAccount(match.params.accountId);
    getAllAccountTransactions(match.params.accountId);
    getTimeSpans(match.params.accountId);
    getTransactionCategories();
  }, [
    getAccount,
    getAllAccountTransactions,
    getTimeSpans,
    match.params.accountId,
    clearAccountTransactionsByYear,
    getAllAccountTransactionsByYear,
    getTransactionCategories,
  ]);

  // Get graph Data
  const getGraphData = () => {
    clearAccountTransactionsByYear();
    getAllAccountTransactionsByYear(
      account.account._id,
      currentYear,
      currentMonth + 1,
      currentDay
    );
  };

  if (account.loading || !account.account || transaction.loading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Fragment>
        <Suspense fallback={<p>Loading account information...</p>}>
          <AccountDetail />
        </Suspense>
      </Fragment>

      {/* FRAGMENT FOR ACCOUNT LIST */}
      <hr />
      <Fragment>
        <div className="container">
          <Fragment>
            <button className="btn" onClick={getGraphData}>
              Update Graphs
            </button>
            <AccountChart accountData={account.account} />
          </Fragment>
          <p
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTimeSpan"
            aria-expanded="false"
            aria-controls="collapseTimeSpan"
          >
            <span className="d-flex justify-content-between align-items-end fs-3">
              Time Intervals
              <i className="material-icons prefix">expand_more</i>
            </span>
          </p>
          <div className="collapse" id="collapseTimeSpan">
            <TimeIntervall />
          </div>
          <hr />

          <p
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTransactions"
            aria-expanded="false"
            aria-controls="collapseTransactions"
          >
            <span className="d-flex justify-content-between align-items-end fs-3">
              Account Transactions
              <i className="material-icons prefix">expand_more</i>
            </span>
          </p>
          <div className="collapse" id="collapseTransactions">
            <AccountTransactions />
          </div>

          <hr />
          {/* Bar */}
          <Fragment>
            <p
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseBar"
              aria-expanded="false"
              aria-controls="collapseBar"
            >
              <span className="d-flex justify-content-between align-items-end fs-3">
                Transactions / Type
                <i className="material-icons prefix">expand_more</i>
              </span>
            </p>
            <div className="collapse" id="collapseBar">
              <TransactionsPerTypeChart
                month={currentMonth}
                day={currentDay}
                year={currentYear}
              />
            </div>
          </Fragment>
        </div>
      </Fragment>

      {/* Action Button */}
      <AddBtn />
      <AddTransactionModal />
      <AddTimeintervallModal />
      <DeleteAccountModal />
      <EditTransactionModal />
    </Fragment>
  );
};

Account.propTypes = {
  account: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  getAccount: PropTypes.func.isRequired,
  getAllAccountTransactions: PropTypes.func.isRequired,
  getTimeSpans: PropTypes.func,
  getTransactionCategories: PropTypes.func,
};

const mapStateToProps = (state) => ({
  account: state.account,
  transaction: state.transaction,
});

export default connect(mapStateToProps, {
  getAccount,
  getAllAccountTransactions,
  getTimeSpans,
  getAllAccountTransactionsByYear,
  clearAccountTransactionsByYear,
  getTransactionCategories,
})(Account);
