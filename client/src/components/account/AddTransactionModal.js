import React from "react";

const AddTransactionModal = () => {
  return (
    <div id="add-transaction-modal" className="modal mt-5">
      <div className="modal-content mb-3">
        <h4>New Transaction</h4>
        <form action="">
          {/* DATE */}
          <label htmlFor="transactionDate" className="active">
            Transaction Date
          </label>
          <input type="date" name="transactionDate" id="" />

          {/* TYPE */}
          <select className="">
            <option defaultValue>Transaction Type</option>
            <option value="1">Income</option>
            <option value="2">Spending</option>
          </select>

          {/* DESCRIPTION */}
          <label htmlFor="description" className="active">
            Description
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            id=""
            placeholder="Paycheck, bills etc."
          ></input>

          {/* SUM */}
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="number"
              name="sum"
              id="floatingSum"
              placeholder="Transaction sum"
            />
            <label htmlFor="floatingSum">Transaction Sum (i.e. 4.30)</label>
          </div>
        <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
