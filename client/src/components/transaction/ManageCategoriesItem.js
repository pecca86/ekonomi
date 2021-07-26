import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteTransactionCategory,
  setCurrentTransactionCategory,
  updateTransactionCategory,
} from "../../actions/transaction/transactionActions";

const ManageCategoriesItem = ({
  category,
  deleteTransactionCategory,
  setCurrentTransactionCategory,
  updateTransactionCategory,
  transaction,
}) => {
  useEffect(() => {
    if (transaction.currentTransactionCategory) {
      setFormData({
        transactionCategory:
          transaction.currentTransactionCategory.transactionCategory,
      });
    }
  }, [transaction.currentTransactionCategory]);
  // STATES
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    transactionCategory: null,
  });

  // COMPONENT FUNCTIONS
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onDelete = (e) => {
    deleteTransactionCategory(category._id);
  };

  const onEdit = (e) => {
    setShowEdit(!showEdit);
    setCurrentTransactionCategory(category);
  };

  const onCancel = (e) => {
    setShowEdit(!showEdit);
  };

  const onSubmit = (e) => {
    console.log(formData);
    updateTransactionCategory(formData, category._id);
    setShowEdit(!showEdit);
  };

  return (
    <Fragment>
      {category.transactionCategory === "Uncategorized" ? (
        ""
      ) : (
        <tr>
          <td>
            {showEdit ? (
              <input
                type="text"
                value={formData.transactionCategory}
                name="transactionCategory"
                onChange={onChange}
                required
              />
            ) : (
              category.transactionCategory
            )}
          </td>
          {/* DELETE BTN */}
          <td className="">
            {showEdit ? (
              <Fragment>
                <i onClick={onSubmit} className="material-icons trash-icon">
                  check
                </i>
                <i
                  onClick={onCancel}
                  className="material-icons ps-2 action-icon"
                >
                  close
                </i>
              </Fragment>
            ) : (
              <Fragment>
                <i onClick={onDelete} className="material-icons trash-icon">
                  delete_forever
                </i>
                <i onClick={onEdit} className="material-icons ps-2 action-icon">
                  edit
                </i>
              </Fragment>
            )}
          </td>
        </tr>
      )}
    </Fragment>
  );
};

ManageCategoriesItem.propTypes = {
  transaction: PropTypes.object.isRequired,
  deleteTransactionCategory: PropTypes.func.isRequired,
  setCurrentTransactionCategory: PropTypes.func.isRequired,
  updateTransactionCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
});

export default connect(mapStateToProps, {
  deleteTransactionCategory,
  setCurrentTransactionCategory,
  updateTransactionCategory,
})(ManageCategoriesItem);
