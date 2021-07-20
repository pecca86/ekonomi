import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAccounts } from "../../actions/account/accountActions";
import AccountListItem from "./AccountListItem";
import { flushTimeIntervalls } from "../../actions/transaction/transactionActions";

const AccountList = ({ account, getAccounts, flushTimeIntervalls }) => {
  
  useEffect(() => {
    flushTimeIntervalls();
    countTotalSum();
    // eslint-disable-next-line
  }, [getAccounts, flushTimeIntervalls,account]);

  const [totalSum, setTotalSum] = useState({sum: 0})
  
  if (account.loading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }
  
  const countTotalSum = () => {
    let sumCount = 0
    account && account.accounts.map((account) => (sumCount += account.balance));
    setTotalSum({sum: sumCount})
  };

  return (
    <div className="mt-5" style={{ height: "300px", overflow: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Account Name</th>
            <th scope="col">{""}</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {account ? (
            account.accounts.map((account) => (
              <AccountListItem key={account._id} account={account} />
            ))
          ) : (
            <tr>
              <td>
                <p>Create a new Account!</p>
              </td>
            </tr>
          )}
          <tr>
            <td>Total:</td>
            <td>{""}</td>
            <td className="fw-bold">{totalSum.sum}€</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

AccountList.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  flushTimeIntervalls: PropTypes.func,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, { getAccounts, flushTimeIntervalls })(
  AccountList
);
