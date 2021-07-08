import React, { Fragment, Suspense } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SortBtn from "../layout/SortBtn";

//import AccounTransactionItem from "./AccountTransactionItem";
const AccounTransactionItem = React.lazy(() =>
  import("./AccountTransactionItem")
);

const AccountTransactions = ({ transaction }) => {
  if (transaction.loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ height: "300px", overflow: "auto" }}>
      <SortBtn />
      <table className="table-sm">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
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
});

export default connect(mapStateToProps, {})(AccountTransactions);
