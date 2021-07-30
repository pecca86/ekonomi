import React, { Fragment } from "react";

const TransactionFilter = () => {
  return (
    <Fragment>
      <label htmlFor="transactionFilter">Filter</label>
      <input type="text" id="transactionFilter" />
    </Fragment>
  );
};

export default TransactionFilter;
