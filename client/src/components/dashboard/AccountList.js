import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAccounts } from "../../actions/account/accountActions";
import AddAccountModal from "../account/AddAccountModal";
import AddAccountBtn from "../account/AddAccountBtn";
import AccountListItem from "./AccountListItem";
import { flushTimeIntervalls } from "../../actions/transaction/transactionActions";

const AccountList = ({ account, getAccounts, flushTimeIntervalls }) => {
  useEffect(() => {
    getAccounts();
    flushTimeIntervalls()
  }, [getAccounts, flushTimeIntervalls]);

  if (account.loading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mt-5" style={{ height: "300px", overflow: "auto" }}>
      <AddAccountBtn />
      <AddAccountModal />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Balance</th>
            <th scope="col">{""}</th>
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

export default connect(mapStateToProps, { getAccounts, flushTimeIntervalls })(AccountList);
