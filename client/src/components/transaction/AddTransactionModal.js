import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createTransaction } from "../../actions/transaction/transactionActions";

const AddTransactionModal = ({ createTransaction, account }) => {
  const [formData, setFormData] = useState({
    sum: 0,
    transactionType: "",
    description: "",
    transactionDate: "",
    monthsRecurring: 0
  });

  const [recur, setRecurring] = useState(false);

  // STATE FUNCTIONS
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createTransaction(formData, account.account._id);
    // es-lint-disable-next-line
    setFormData({ ...formData, monthsRecurring: 0 });
    setRecurring(false)
  };

  return (
    <div id="add-transaction-modal" className="modal mt-5">
      <div className="modal-content mb-3">
        <h4>New Transaction</h4>
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
          <select className="" onChange={onChange} name="transactionType" required>
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
              id="floatingSum"
              placeholder="Transaction sum"
              value={formData.sum}
              onChange={onChange}
              required
            />
            <label htmlFor="floatingSum">Transaction Sum (i.e. 4.30)</label>
          </div>

          {/* REOCCURING */}
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={recur}
                  value={recur}
                  onChange={() => setRecurring(!recur)}
                />
                <span>Make transaction recurring</span>
              </label>
            </p>
          </div>
          {recur && (
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="number"
                name="monthsRecurring"
                id="floatingMonths"
                placeholder="Months forward"
                value={formData.monthsRecurring}
                onChange={onChange}
              />
              <label htmlFor="floatingMonths">Enter how many months forward</label>
            </div>
          )}

          {/* BUTTON */}
          <button className="btn btn-success modal-close">Submit</button>
        </form>
      </div>
    </div>
  );
};

AddTransactionModal.propTypes = {
  createTransaction: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, { createTransaction })(
  AddTransactionModal
);
