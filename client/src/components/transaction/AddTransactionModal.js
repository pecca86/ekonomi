import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  createTransaction,
  addTransactionCategory,
} from "../../actions/transaction/transactionActions";
import { setAlert } from "../../actions/alerts/alertActions";
import Select from "react-select";
import { Link } from "react-router-dom";

const AddTransactionModal = ({
  createTransaction,
  account,
  current,
  setAlert,
  transactionCategories,
  addTransactionCategory,
}) => {
  // === COMPONENT STATES ===
  const [formData, setFormData] = useState({
    sum: 0,
    transactionType: "",
    description: "",
    transactionDate: "",
    monthsRecurring: 0,
    category: null,
  });

  const [recur, setRecurring] = useState(false);
  const [newCategory, setNewCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
    id: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

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

  useEffect(() => {
    if (current !== null) {
      setFormData({
        transactionDate: current.transactionDate.substring(0, 10),
        sum: Math.abs(current.sum),
        transactionType: current.transactionType,
        description: current.description,
        monthsRecurring: 0,
      });
    }
    //es-lint-disable-next-line
  }, [current]);

  // STATE FUNCTIONS
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Change new category input
  const onCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.transactionType) {
      setAlert("Please fill in Transaction Type!", "danger");
    } else if (formData.monthsRecurring < 0 || formData.monthsRecurring > 12) {
      setAlert("You can only add 12 months ahead!", "danger");
    } else {
      formData.category = selectedOption.id;
      // Need to nullify so that our backend can create a new Uncategorized category
      if (formData.category === "") {
        formData.category = null;
      }
      createTransaction(formData, account.account._id);
      // es-lint-disable-next-line
      setFormData({ ...formData, monthsRecurring: 0 });
      setRecurring(false);
    }
  };

  // Show add category form
  const showAdd = (e) => {
    setShowAddForm(!showAddForm);
  };

  // Adding a new category
  const onSubmitCategory = (e) => {
    addTransactionCategory(newCategory);
    setNewCategory(null);
    setShowAddForm(false);
  };

  if (!transactionCategories) {
    return <p>Loading...</p>;
  }

  return (
    <div id="add-transaction-modal" className="modal mt-5">
      <div className="modal-content mb-3">
        <h4>{current ? "Copy Transaction" : "New Transaction"}</h4>
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
              id="floatingSum"
              placeholder="Transaction sum"
              value={formData.sum}
              onChange={onChange}
              min="0"
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
                <span>Make transaction recurring / month (max 12 times)</span>
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
                min="0"
                max="12"
                value={formData.monthsRecurring}
                onChange={onChange}
              />
              <label htmlFor="floatingMonths">
                Enter how many months forward
              </label>
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
  current: PropTypes.object,
  transactionCategories: PropTypes.array,
};

const mapStateToProps = (state) => ({
  account: state.account,
  current: state.transaction.current,
  transactionCategories: state.transaction.transactionCategories,
});

export default connect(mapStateToProps, {
  createTransaction,
  setAlert,
  addTransactionCategory,
})(AddTransactionModal);
