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
} from "../../actions/transaction/transactionActions";

const AlertDialog = ({
  dialogTitle,
  deleteTransaction,
  updateTransaction,
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
        deleteTransaction(transaction.currentTransactions, account._id);
        break;
      case "category":
        //updateTransaction();
        setFormData(null);
        break;
      case "sum":
        const sumData = { sum: formData };
        console.log(sumData);
        updateTransaction(
          sumData,
          account._id,
          transaction.currentTransactions
        );
        setFormData(null);
        console.log("sum updated");
        handleClose();
        break;
      case "type":
        //updateTransaction();
        console.log("type updated");
        break;
      case "description":
        const descriptionData = { description: formData };
        console.log(descriptionData);
        updateTransaction(
          descriptionData,
          account._id,
          transaction.currentTransactions
        );
        setFormData(null);
        handleClose();
        console.log("type updated");
        break;
      default:
        console.log("No such case!");
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Update
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
                <CategorySelector type="type" />
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row">.</div>
              </Fragment>
            )}
            {dialogTitle.value === "delete" && "Delete selected transactions."}
            {dialogTitle.value === "category" && (
              <Fragment>
                <CategorySelector />
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
})(AlertDialog);
