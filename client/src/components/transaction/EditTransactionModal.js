import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  updateTransaction,
  clearCurrentTransaction,
} from "../../actions/transaction/transactionActions";

const EditTransactionModal = ({
  updateTransaction,
  current,
  account,
  clearCurrentTransaction,
}) => {
  // EFFECTS
  useEffect(() => {
    if (current) {
      setFormData({
        sum: Math.abs(current.sum),
        transactionType: current.transactionType,
        description: current.description,
        transactionDate: current.transactionDate.substring(0, 10),
        id: current._id,
      });
    }
  }, [current]);

  // STATES
  const [formData, setFormData] = useState({
    id: "",
    sum: 0,
    transactionType: "",
    description: "",
    transactionDate: "",
  });

  // STATE FUNCTIONS
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    updateTransaction(formData, account.account._id);
    clearCurrentTransaction();
  };

  return (
    <div
      id="edit-transaction-modal"
      className="modal fade mt-5"
      style={{ height: "400px" }}
    >
      <div className="modal-content mb-3">
        <h4>Edit Transaction</h4>
        <form onSubmit={onSubmit}>
          {/* DATE */}
          <label htmlFor="transactionDate" className="active">
            Transaction Date
          </label>
          <input
            type="date"
            name="transactionDate"
            value={formData.transactionDate}
            onChange={onChange}
            required
          />

          {/* TYPE */}
          <select
            className=""
            onChange={onChange}
            name="transactionType"
            value={formData.transactionType}
            required
          >
            <option defaultValue>Transaction Type</option>
            <option value="Income">Income</option>
            <option value="Spending">Spending</option>
          </select>

          {/* DESCRIPTION */}
          <label htmlFor="description" className="active">
            Description
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Paycheck, bills etc."
            value={formData.description}
            onChange={onChange}
          ></input>

          {/* SUM */}
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="number"
              name="sum"
              id="floatingSumEdit"
              placeholder="Transaction sum"
              value={formData.sum}
              onChange={onChange}
            />
            <label htmlFor="floatingSumEdit">Transaction Sum (i.e. 4.30)</label>
          </div>
          <button className="btn btn-success modal-close">Submit</button>
          <span
            onClick={() => clearCurrentTransaction()}
            className="btn orange modal-close ms-2"
          >
            Cancel
          </span>
        </form>
      </div>
    </div>
  );
};

EditTransactionModal.propTypes = {
  updateTransaction: PropTypes.func.isRequired,
  clearCurrentTransaction: PropTypes.func,
  current: PropTypes.object,
  account: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.transaction.current,
  account: state.account,
});

export default connect(mapStateToProps, {
  updateTransaction,
  clearCurrentTransaction,
})(EditTransactionModal);
