import React, { Fragment, Suspense, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SortBtn from "../layout/SortBtn";

import AccountTransactionBtns from "./AccountTransactionBtns";
import TransactionFilter from "./TransactionFilter";

const AccounTransactionItem = React.lazy(() =>
  import("./AccountTransactionItem")
);

const AccountTransactions = ({ transaction, filteredTransactions }) => {
  // STATES
  const [showDelete, setShowDelete] = useState({ showDelete: false });

  if (transaction.loading) {
    return <p>Loading...</p>;
  }

  // FUNCTIONS
  const onClick = (event) => {
    setShowDelete({ showDelete: !showDelete.showDelete });
  };

  return (
    <div style={{ height: "300px", overflow: "auto" }}>
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
      <table className="table-sm">
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

export default connect(mapStateToProps, {})(AccountTransactions);
