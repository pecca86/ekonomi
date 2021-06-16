import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TimeIntervall from "../transaction/TimeIntervall";
import AccountTransactions from "../transaction/AccountTransactions";
import AddBtn from "./AddBtn";
import AddTransactionModal from "../transaction/AddTransactionModal";
import AddTimeintervallModal from "../transaction/AddTimeintervallModal";
import DeleteAccountModal from "./DeleteAccountModal";
import { getAccount } from "../../actions/account/accountActions";
import { getAllAccountTransactions } from "../../actions/transaction/transactionActions";
import { getTimeSpans } from "../../actions/transaction/transactionActions";


const Account = ({
  auth,
  getAccount,
  match,
  account,
  getAllAccountTransactions,
  getTimeSpans,
  transaction,
}) => {
  useEffect(() => {
    getAccount(match.params.accountId);
    getAllAccountTransactions(match.params.accountId);
    getTimeSpans(match.params.accountId);
  }, [
    getAccount,
    getAllAccountTransactions,
    getTimeSpans,
    match.params.accountId,
  ]);

  if (account.loading || !account.account || transaction.loading) {
    return <p>Loading...</p>;
  }

  const {
    account: { IBAN, name, accountType, balance },
  } = account;

  return (
    <Fragment>
      <div className="container">
        <h5>{`${IBAN} - ${name} (${accountType})`}</h5>
        <h6>Balance: {balance}€</h6>
        {profileIcon}
        <span className="ps-2">
          <Link to="/profile" className="text-dark">
            {`${auth.user.firstname} ${auth.user.lastname}`}
          </Link>
        </span>
      </div>
      {/* FRAGMENT FOR ACCOUNT LIST */}
      <hr />
      <Fragment>
        <div className="container">
          <h5>Time Intervals</h5>
          <TimeIntervall />
          <hr />
          <h5>All Account Transactions</h5>
          <AccountTransactions />
        </div>
      </Fragment>
      <AddBtn />
      <AddTransactionModal />
      <AddTimeintervallModal />
      <DeleteAccountModal />
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

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  getAccount: PropTypes.func.isRequired,
  getAllAccountTransactions: PropTypes.func.isRequired,
  getTimeSpans: PropTypes.func,
};

const mapStateToProps = (state) => ({
  account: state.account,
  auth: state.auth,
  transaction: state.transaction,
});

export default connect(mapStateToProps, {
  getAccount,
  getAllAccountTransactions,
  getTimeSpans,
})(Account);
