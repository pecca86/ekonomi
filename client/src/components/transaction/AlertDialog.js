import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
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

const AlertDialog = ({
  dialogTitle,
  deleteTransaction,
  updateTransaction,
  clearCurrentTransactions,
  updateMany,
  deleteMany,
  transaction,
  account,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
    switch (dialogTitle.value) {
      case "delete":
        const data = { transactions: transaction.currentTransactions };
        deleteMany(data, account._id);
        //deleteTransaction(transaction.currentTransactions, account._id);
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
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        OK
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle.label}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogTitle.value !== "delete" && (
              <label htmlFor="update">Value to update to</label>
            )}
            {dialogTitle.value === "sum" && (
              <input
                value={formData}
                onChange={onChange}
                type="number"
                id="update"
                min="0"
              />
            )}
            {dialogTitle.value === "description" && (
              <input
                value={formData}
                onChange={onChange}
                type="text"
                id="update"
              />
            )}
            {dialogTitle.value === "type" && (
              <Fragment>
                <CategorySelector type="type" setData={setFormData} />
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row">.</div>
              </Fragment>
            )}
            {dialogTitle.value === "delete" && "Delete selected transactions."}
            {dialogTitle.value === "category" && (
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
          {dialogTitle.value === "delete" ? (
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
