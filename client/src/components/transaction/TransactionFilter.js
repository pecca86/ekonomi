import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  filterTransactions,
  clearFilter,
} from "../../actions/transaction/transactionActions";

const TransactionFilter = ({
  filterTransactions,
  transaction,
  clearFilter,
}) => {
  useEffect(() => {
    if (transaction.filteredTransactions === null) {
      text.current.value = "";
    }
    clearFilter();
  }, [clearFilter]);

  const text = useRef("");

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterTransactions(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        ref={text}
        type="text"
        placeholder="Filter Transactions..."
        onChange={onChange}
      />
    </form>
  );
};

TransactionFilter.propTypes = {
  transaction: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  account: state.account.account,
});

export default connect(mapStateToProps, { filterTransactions, clearFilter })(
  TransactionFilter
);
