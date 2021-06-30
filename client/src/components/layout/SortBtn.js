import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  sortTransactionsDescending,
  sortTransactionsAscending,
} from "../../actions/transaction/transactionActions";

const SortBtn = ({ sortTransactionsDescending, sortTransactionsAscending }) => {
  return (
    <div class="dropdown">
      <button
        class="btn btn-flat btn-small border-button dropdown-toggle ps-1"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Sort by
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a
            href="#!"
            className="dropdown-item"
            onClick={() => sortTransactionsAscending()}
          >
            Oldest first
          </a>
        </li>
        <li>
          <a
            href="#!"
            className="dropdown-item"
            onClick={() => sortTransactionsDescending()}
          >
            Newest first
          </a>
        </li>
      </ul>
    </div>
  );
};

SortBtn.propTypes = {
  sortTransactionsAscending: PropTypes.func,
  sortTransactionsDescending: PropTypes.func,
};

export default connect(null, {
  sortTransactionsDescending,
  sortTransactionsAscending,
})(SortBtn);
