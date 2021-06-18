import React, { Fragment, useEffect, Suspense } from "react";
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
import AccountDetail from "./AccountDetail";

const Account = ({
  getAccount,
  match,
  account,
  getAllAccountTransactions,
  getTimeSpans,
  transaction,
}) => {
  // Effect upon loading and when something gets changed
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

  return (
    <Fragment>
      <Fragment>
        <Suspense fallback={<p>Loading account information...</p>}>
          <AccountDetail account={account} />
        </Suspense>
      </Fragment>

      {/* FRAGMENT FOR ACCOUNT LIST */}
      <hr />
      <Fragment>
        <div className="container">
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
        </div>
      </Fragment>
      <AddBtn />
      <AddTransactionModal />
      <AddTimeintervallModal />
      <DeleteAccountModal />
    </Fragment>
  );
};

Account.propTypes = {
  account: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  getAccount: PropTypes.func.isRequired,
  getAllAccountTransactions: PropTypes.func.isRequired,
  getTimeSpans: PropTypes.func,
};

const mapStateToProps = (state) => ({
  account: state.account,
  transaction: state.transaction,
});

export default connect(mapStateToProps, {
  getAccount,
  getAllAccountTransactions,
  getTimeSpans,
})(Account);
