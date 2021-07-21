import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteTransactionCategory } from "../../actions/transaction/transactionActions";

const ManageCategoriesItem = ({ category, deleteTransactionCategory }) => {
  // COMPONENT FUNCTIONS
  const onDelete = (e) => {
    deleteTransactionCategory(category._id);
  };
  return (
    <tr>
      <td>{category.transactionCategory}</td>
      {/* DELETE BTN */}
      <td className="trash-icon">
        <i onClick={onDelete} className="material-icons">
          delete_forever
        </i>
      </td>
    </tr>
  );
};

ManageCategoriesItem.propTypes = {
  transaction: PropTypes.object.isRequired,
  deleteTransactionCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
});

export default connect(mapStateToProps, { deleteTransactionCategory })(
  ManageCategoriesItem
);
