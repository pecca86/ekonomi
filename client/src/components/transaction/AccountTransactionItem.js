import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import TransActionBtn from "./TransActionBtn";

const AccountTransactionItem = ({ transaction, account }) => {
  const { sum, transactionDate, description, _id, transactionType, category } =
    transaction;

  return (
    <tr>
      <td>
        <Moment format="DD.MM.YYYY">{transactionDate}</Moment>
      </td>
      <td>{description}</td>
      <td>{category.transactionCategory}</td>
      {transactionType === "Spending" ? (
        <td className="spending">{sum}€</td>
      ) : (
        <td className="income">{sum}€</td>
      )}
      {/* <!-- Example split danger button --> */}
      <td>
        <Fragment>
          <TransActionBtn
            id={_id}
            accountId={account.account._id}
            transaction={transaction}
          />
        </Fragment>
      </td>
    </tr>
  );
};

AccountTransactionItem.propTypes = {
  account: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps)(AccountTransactionItem);
