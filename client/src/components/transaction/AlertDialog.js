import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Select from "react-select";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CategorySelector from "./CategorySelector";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteTransaction,
  updateTransaction,
  clearCurrentTransactions,
  updateMany,
  deleteMany,
} from "../../actions/transaction/transactionActions";
import { setAlert } from "../../actions/alerts/alertActions";

const AlertDialog = ({
  clearCurrentTransactions,
  updateMany,
  deleteMany,
  transaction,
  account,
}) => {
  // SELECT
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });

  const setSelected = e => {
    console.log(e);
    setSelectedOption({ value: e.value, label: e.label})
    setOpen(true)
  }

  const options = [
    { value: "delete", label: "Delete" },
    { value: "description", label: "Update Description" },
    { value: "category", label: "Update Category" },
    { value: "sum", label: "Update Sum" },
    { value: "type", label: "Update Type" },
  ];

  //

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  // STATE FUNCTIONS
  const onChange = (e) => {
    const val = e.target.value;
    setFormData(val);
  };

  const onSubmit = () => {
    //setOpen(false)
    switch (selectedOption.value) {
      case "delete":
        const data = { transactions: transaction.currentTransactions };
        deleteMany(data, account._id);
        clearCurrentTransactions();
        handleClose();
        break;
      case "category":
        const categoryData = { data: { category: formData } };
        updateMany(categoryData, account._id, transaction.currentTransactions);
        setFormData(null);
        handleClose();
        break;
      case "sum":
        const sumData = { data: { sum: formData } };
        updateMany(sumData, account._id, transaction.currentTransactions);
        setFormData(null);
        handleClose();
        break;
      case "type":
        const typeData = { data: { transactionType: formData } };
        updateMany(typeData, account._id, transaction.currentTransactions);
        setFormData(null);
        handleClose();
        break;
      case "description":
        const descriptionData = { data: { description: formData } };
        updateMany(
          descriptionData,
          account._id,
          transaction.currentTransactions
        );
        setFormData(null);
        handleClose();
        break;
      default:
        console.log("No such case!");
    }
  };

  return (
    <div>
      <Select
        name="category"
        id="category"
        defaultValue={selectedOption}
        onChange={setSelected}
        options={options}
        required
        nonce="r@nd0m"
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{selectedOption.label}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedOption.value !== "delete" && (
              <label htmlFor="update">Value to update to</label>
              )}
            {selectedOption.value === "sum" && (
              <input
                value={formData}
                onChange={onChange}
                type="number"
                id="update"
                min="0"
              />
            )}
            {selectedOption.value === "description" && (
              <input
                value={formData}
                onChange={onChange}
                type="text"
                id="update"
              />
            )}
            {selectedOption.value === "type" && (
              <Fragment>
                <CategorySelector type="type" setData={setFormData} />
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row">.</div>
              </Fragment>
            )}
            {selectedOption.value === "delete" && "Delete selected transactions."}
            {selectedOption.value === "category" && (
              <Fragment>
                <CategorySelector setData={setFormData} />
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row">.</div>
              </Fragment>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {selectedOption.value === "delete" ? (
            <Fragment>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={onSubmit} color="primary" autoFocus>
                Delete
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={onSubmit} color="primary" autoFocus>
                OK
              </Button>
            </Fragment>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.propTypes = {
  transactionCategories: PropTypes.array,
};

const mapStateToProps = (state) => ({
  transactionCategories: state.transaction.transactionCategories,
  transaction: state.transaction,
  account: state.account.account,
});

export default connect(mapStateToProps, {
  deleteTransaction,
  updateTransaction,
  clearCurrentTransactions,
  updateMany,
  deleteMany,
})(AlertDialog);
