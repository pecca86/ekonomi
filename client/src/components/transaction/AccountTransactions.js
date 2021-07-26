import React, { Fragment, Suspense, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SortBtn from "../layout/SortBtn";
import Chip from "@material-ui/core/Chip";
import { deleteTransaction } from "../../actions/transaction/transactionActions";

const AccounTransactionItem = React.lazy(() =>
  import("./AccountTransactionItem")
);

const AccountTransactions = ({ transaction, deleteTransaction }) => {
  // STATES
  const [showDelete, setShowDelete] = useState({ showDelete: false });

  if (transaction.loading) {
    return <p>Loading...</p>;
  }

  // FUNCTIONS
  const onClick = (event) => {
    setShowDelete({ showDelete: !showDelete.showDelete });
  };

  const onDeleteMany = () => {
    deleteTransaction(transaction.currentTransactions);
  };

  return (
    <div style={{ height: "300px", overflow: "auto" }}>
      <span>
        <SortBtn />
        {showDelete.showDelete ? (
          <Fragment>
            <Chip
              onClick={onDeleteMany}
              label="Delete Selected Transactions"
              clickable
              color="secondary"
            />
            <Chip
              onClick={onClick}
              label="Cancel"
              clickable
              color="primary"
              className="ms-2"
            />
          </Fragment>
        ) : (
          <Fragment>
            <Chip
              onClick={onClick}
              label="Delete Many"
              clickable
              color="default"
            />
          </Fragment>
        )}
      </span>
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
              {transaction.transactions.map((transaction) => (
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
});

export default connect(mapStateToProps, {
  deleteTransaction,
})(AccountTransactions);
