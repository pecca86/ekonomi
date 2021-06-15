import React, {Fragment, useEffect} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AccounTransactionItem from "./AccountTransactionItem";


const AccountTransactions = ({transaction}) => {

  if (transaction.loading) {
    return (<p>Loading...</p>)
  }

  return (
    <div style={{ height: "300px", overflow: "auto" }}>
      <table className="table-sm">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Sum</th>
            <th scope="col">{""}</th>
          </tr>
        </thead>
        <tbody>
          {transaction.transactions.map(transaction => (
            <Fragment>
              <AccounTransactionItem key={transaction._id} transaction={transaction} />
            </Fragment>
          ))}
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

export default connect(mapStateToProps)(AccountTransactions)