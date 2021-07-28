import React, { Fragment, Suspense, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SortBtn from "../layout/SortBtn";
import Chip from "@material-ui/core/Chip";
import {
  deleteTransaction,
  clearCurrentTransactions,
} from "../../actions/transaction/transactionActions";

const AccounTransactionItem = React.lazy(() =>
  import("./AccountTransactionItem")
);

const AccountTransactions = ({
  transaction,
  deleteTransaction,
  clearCurrentTransactions,
  account,
}) => {
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
    deleteTransaction(transaction.currentTransactions, account._id);
    clearCurrentTransactions();
    setShowDelete({ showDelete: false });
  };

  return (
    <div style={{ height: "300px", overflow: "auto" }}>
      <div className="row">
        <div className="col col-sm-2">
          <SortBtn />
        </div>
        {showDelete.showDelete ? (
          <Fragment>
            <div className="col col-sm-2">
              <Chip
                onClick={onDeleteMany}
                label="Delete Selection"
                clickable
                color="secondary"
                nonce="r@nd0m"
              />
            </div>
            <div className="col col-sm-8">
              <Chip
                onClick={onClick}
                label="Cancel"
                clickable
                color="primary"
              />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="col col-sm-5">
              <Chip
                onClick={onClick}
                label="Delete Many"
                clickable
                color="default"
              />
            </div>
          </Fragment>
        )}
      </div>
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
  clearCurrentTransactions,
})(AccountTransactions);
