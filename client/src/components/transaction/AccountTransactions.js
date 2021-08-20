import React, { Fragment, Suspense, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SortBtn from "../layout/SortBtn";

import AccountTransactionBtns from "./AccountTransactionBtns";
import TransactionFilter from "./TransactionFilter";

import { clearCurrentTransactions } from "../../actions/transaction/transactionActions";

const AccounTransactionItem = React.lazy(() =>
  import("./AccountTransactionItem")
);

const AccountTransactions = ({
  transaction,
  filteredTransactions,
  clearCurrentTransactions,
}) => {
  // STATES
  const [showDelete, setShowDelete] = useState({ showDelete: false });
  // Clears all selections in child components AccountTransactionsItem.js
  const [clear, setClear] = useState(false);

  if (transaction.loading) {
    return <p>Loading...</p>;
  }

  // FUNCTIONS
  const onClick = (event) => {
    setShowDelete({ showDelete: !showDelete.showDelete });
  };

  const onClear = (e) => {
    e.preventDefault();
    setClear(true);
    clearCurrentTransactions();
  };

  return (
    <div style={{ height: "400px", overflow: "auto" }}>
      <Fragment>
        <div className="stickypanel">
          <div className="row">
            <div className="col col-md-4">
              {showDelete.showDelete ? "" : <SortBtn />}
            </div>
            <AccountTransactionBtns
              onClick={onClick}
              showDelete={showDelete.showDelete}
            />
          </div>
          <div>{showDelete.showDelete ? "" : <TransactionFilter />}</div>
        </div>
      </Fragment>
      <Fragment>
        {showDelete.showDelete && (
          <button className="btn-outline-primary own-button" onClick={onClear}>
            Clear Selections
          </button>
        )}
      </Fragment>
      <table className="table-sm account-transactions-table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Sum</th>
            <th scope="col">{""}</th>
            <th scope="col">{""}</th>
            <th scope="col">{""}</th>
          </tr>
        </thead>
        <tbody>
          <Fragment>
            <Suspense
              fallback={
                <tr>
                  <td>Loading transactions...</td>
                </tr>
              }
            >
              {filteredTransactions.length > 0
                ? filteredTransactions.map((filtered) => (
                    <AccounTransactionItem
                      key={filtered._id}
                      transaction={filtered}
                      showDelete={showDelete.showDelete}
                    />
                  ))
                : transaction.transactions.map((transaction) => (
                    <AccounTransactionItem
                      key={transaction._id}
                      transaction={transaction}
                      showDelete={showDelete.showDelete}
                      clearSelections={clear}
                      setClearSelections={setClear}
                    />
                  ))}
            </Suspense>
          </Fragment>
        </tbody>
      </table>
    </div>
  );
};

AccountTransactions.propTypes = {
  transaction: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  account: state.account.account,
  filteredTransactions: state.transaction.filteredTransactions,
});

export default connect(mapStateToProps, { clearCurrentTransactions })(
  AccountTransactions
);
