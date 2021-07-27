import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ManageCategoriesItem from "./ManageCategoriesItem";
import {
  getTransactionCategories,
  addTransactionCategory,
} from "../../actions/transaction/transactionActions";

const ManageCategories = ({
  transaction,
  getTransactionCategories,
  addTransactionCategory,
}) => {
  useEffect(() => {
    getTransactionCategories();
  }, [getTransactionCategories]);

  // COMPONENT STATES
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState(null);

  // COMPONENT FUNCTIONS
  // Show add category form
  const showAdd = (e) => {
    setShowAddForm(!showAddForm);
  };

  // Change new category input
  const onCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  // Adding a new category
  const onSubmitCategory = (e) => {
    addTransactionCategory(newCategory);
    setNewCategory(null);
    setShowAddForm(false);
  };

  return (
    <div className="container">
      <h4>Manage Transaction Categories</h4>
      <i onClick={showAdd} className="medium material-icons action-icon">
        add_circle
      </i>
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
      <div className="mt-5" style={{ height: "300px", overflow: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {transaction ? (
              transaction.transactionCategories.map((category) => (
                <ManageCategoriesItem key={category._id} category={category} />
              ))
            ) : (
              <tr>
                <td>
                  <p>No categories added yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ManageCategories.propTypes = {
  transaction: PropTypes.object.isRequired,
  addTransactionCategory: PropTypes.func.isRequired,
  getTransactionCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
});

export default connect(mapStateToProps, {
  getTransactionCategories,
  addTransactionCategory,
})(ManageCategories);
