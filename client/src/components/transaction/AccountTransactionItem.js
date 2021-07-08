import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import {
  deleteTransaction,
  setCurrentTransaction,
} from "../../actions/transaction/transactionActions";

const AccountTransactionItem = ({
  transaction,
  deleteTransaction,
  setCurrentTransaction,
  account,
}) => {
  const { sum, transactionDate, description, _id, transactionType } =
    transaction;

  const onDelete = (e) => {
    e.preventDefault();
    deleteTransaction(_id, account.account._id);
  };

  return (
    <tr>
      <td>
        <Moment format="DD.MM.YYYY">{transactionDate}</Moment>
      </td>
      <td>{description}</td>
      {transactionType === "Spending" ? (
        <td className="spending">{sum}€</td>
      ) : (
        <td className="income">{sum}€</td>
      )}
      {/* DELETE BTN */}
      <td className="trash-icon" onClick={onDelete}>
        {trash}{" "}
      </td>
      {/* EDIT BTN */}
      <td className="">
        <a
          className="waves-effect waves-light modal-trigger"
          href="#edit-transaction-modal"
        >
          <i
            onClick={() => setCurrentTransaction(transaction)}
            className="tiny material-icons prefix text-dark action-icon"
            data-toggle="modal"
            data-target="#edit-transaction-modal"
          >
            mode_edit
          </i>
        </a>
      </td>
      {/* COPY BTN */}
      <td className="">
        <a
          className="waves-effect waves-light modal-trigger"
          href="#add-transaction-modal"
        >
          <i
            onClick={() => setCurrentTransaction(transaction)}
            className="tiny material-icons prefix text-dark action-icon"
            data-toggle="modal"
            data-target="#add-transaction-modal"
          >
            content_copy
          </i>
        </a>
      </td>
    </tr>
  );
};

const trash = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-trash"
    viewBox="0 0 16 16"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
    <path
      fillRule="evenodd"
      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
    />
  </svg>
);

AccountTransactionItem.propTypes = {
  deleteTransaction: PropTypes.func.isRequired,
  setCurrentTransaction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, {
  deleteTransaction,
  setCurrentTransaction,
})(AccountTransactionItem);
