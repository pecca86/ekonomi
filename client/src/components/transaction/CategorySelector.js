import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTransactionCategory } from "../../actions/transaction/transactionActions";
import Select from "react-select";

const CategorySelector = ({
  addTransactionCategory,
  transactionCategories,
  type,
  setData,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
    id: "",
  });
  // Options for our select array
  const options = [];
  type === "type"
    ? options.push(
        { value: "Spending", label: "Spending" },
        { value: "Income", label: "Income" }
      )
    : transactionCategories &&
      transactionCategories.map((t) =>
        options.push({
          value: t.transactionCategory,
          label: t.transactionCategory,
          id: t._id,
        })
      );

  // Send data back to parent component if parentComponent has provided a useState
  if (setData) {
    setData(selectedOption.value);
  }

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

  // Change new category input
  const onCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  return (
    <Fragment>
      {type === "type" ? (
        <Fragment>
          <label htmlFor="category">Transaction Type</label>
        </Fragment>
      ) : (
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
        </Fragment>
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
  );
};

CategorySelector.propTypes = {
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

export default connect(mapStateToProps, { addTransactionCategory })(
  CategorySelector
);
