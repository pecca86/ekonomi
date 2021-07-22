import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteTransaction,
  setCurrentTransaction,
} from "../../actions/transaction/transactionActions";

const SortBtn = ({
  deleteTransaction,
  setCurrentTransaction,
  id,
  accountId,
  transaction,
}) => {
  // COMPONENT FUNCTIONS
  const onDelete = (e) => {
    e.preventDefault();
    deleteTransaction(id, accountId);
  };
  return (
    <div className="dropdown">
      <i
        className="material-icons dropdown-toggle ps-1 action-icon"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        more_vert
      </i>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
        <li>
          <i
            onClick={onDelete}
            className="small material-icons action-icon ps-1 dropdown-icon"
          >
            delete
          </i>
        </li>
        <li>
          <a
            className="waves-effect waves-light modal-trigger dropdown-icon action-icon"
            href="#add-transaction-modal"
          >
            <i
              onClick={() => setCurrentTransaction(transaction)}
              className="small material-icons prefix text-dark action-icon ps-1 dropdown-icon"
              data-toggle="modal"
              data-target="#add-transaction-modal"
            >
              content_copy
            </i>
          </a>
        </li>
        <li>
          <a
            className="waves-effect waves-light modal-trigger mt-1 dropdown-icon action-icon"
            href="#edit-transaction-modal"
          >
            <i
              onClick={() => setCurrentTransaction(transaction)}
              className="small material-icons prefix text-dark action-icon ps-1 dropdown-icon"
              data-toggle="modal"
              data-target="#edit-transaction-modal"
            >
              mode_edit
            </i>
          </a>
        </li>
      </ul>
    </div>
  );
};

SortBtn.propTypes = {
  deleteTransaction: PropTypes.func,
  setCurrentTransaction: PropTypes.func,
};

export default connect(null, {
  deleteTransaction,
  setCurrentTransaction,
})(SortBtn);
