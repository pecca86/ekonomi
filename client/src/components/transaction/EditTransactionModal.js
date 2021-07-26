import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  updateTransaction,
  clearCurrentTransaction,
  addTransactionCategory,
  getTransactionCategories,
} from "../../actions/transaction/transactionActions";
import Select from "react-select";
import { Link } from "react-router-dom";

const EditTransactionModal = ({
  updateTransaction,
  current,
  account,
  clearCurrentTransaction,
  addTransactionCategory,
  transactionCategories,
}) => {
  // Options for our select array
  const options = [];
  transactionCategories &&
    transactionCategories.map((t) =>
      options.push({
        value: t.transactionCategory,
        label: t.transactionCategory,
        id: t._id,
      })
    );
  // EFFECTS
  useEffect(() => {
    if (current) {
      setFormData({
        sum: Math.abs(current.sum),
        transactionType: current.transactionType,
        description: current.description,
        transactionDate: current.transactionDate.substring(0, 10),
        id: current._id,
        category: null,
      });
      setSelectedOption({
        value: "",
        label: "",
      });
      if (current.category) {
        setFormData({
          sum: Math.abs(current.sum),
          transactionType: current.transactionType,
          description: current.description,
          transactionDate: current.transactionDate.substring(0, 10),
          id: current._id,
          category: current.category._id,
        });
        setSelectedOption({
          value: current.category.transactionCategory,
          label: current.category.transactionCategory,
          id: current.category._id,
        });
      }
    }
  }, [current]);

  // STATES
  const [formData, setFormData] = useState({
    id: "",
    sum: 0,
    transactionType: "",
    description: "",
    transactionDate: "",
    category: null,
  });

  const [newCategory, setNewCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
    id: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // STATE FUNCTIONS
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.category = selectedOption.id;
    if (formData.category === "") {
      formData.category = "Uncategorized";
    }
    updateTransaction(formData, account.account._id);
    clearCurrentTransaction();
  };

  // Show add category form
  const showAdd = (e) => {
    setShowAddForm(!showAddForm);
  };

  // Adding a new category
  const onSubmitCategory = (e) => {
    console.log(formData);
    addTransactionCategory(newCategory);
    setNewCategory(null);
    setShowAddForm(false);
  };

  // Change new category input
  const onCategoryChange = (e) => {
    setNewCategory(e.target.value);
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

          {/* CATEGORY */}

          <Fragment>
            <label htmlFor="category">Transaction Category</label>
            <span className="ps-2">
              <a href="#!" onClick={showAdd}>
                / Add a new Category
              </a>
            </span>
            <span className="ps-2">
              <Link className="modal-close" to="/transactions/categories">
                / Manage Categories (new page)
              </Link>
            </span>
            {showAddForm && (
              <div className="row justify-content-start mt-3">
                <div className="col-7">
                  <input
                    onChange={onCategoryChange}
                    type="text"
                    name="newCategory"
                  ></input>
                </div>
                <div className="col-1">
                  <i
                    onClick={onSubmitCategory}
                    className="material-icons prefix text-success action-icon"
                  >
                    add_circle
                  </i>
                </div>
                <div className="col-1">
                  <i
                    onClick={showAdd}
                    className="material-icons prefix text-danger action-icon"
                  >
                    cancel
                  </i>
                </div>
              </div>
            )}
            <Select
              name="category"
              id="category"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              required
            />
          </Fragment>

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
  addTransactionCategory: PropTypes.func,
  current: PropTypes.object,
  account: PropTypes.object.isRequired,
  transactionCategories: PropTypes.array,
};

const mapStateToProps = (state) => ({
  current: state.transaction.current,
  account: state.account,
  transactionCategories: state.transaction.transactionCategories,
});

export default connect(mapStateToProps, {
  updateTransaction,
  clearCurrentTransaction,
  addTransactionCategory,
})(EditTransactionModal);
