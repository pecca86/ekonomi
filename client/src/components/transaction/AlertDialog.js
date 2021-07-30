import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "react-select";

export default function AlertDialog({ dialogTitle }) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const options = [
    { value: "delete", label: "Delete" },
    { value: "description", label: "Update Description" },
    { value: "category", label: "Update Category" },
    { value: "sum", label: "Update Sum" },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              <input type="number" id="update" min="0" />
            )}
            {dialogTitle.value === "description" && (
              <input type="text" id="update" />
            )}
            {dialogTitle.value === "delete" && "Delete selected transactions."}
            {dialogTitle.value === "category" && (
              <Fragment>
                <Select
                  name="category"
                  id="category"
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  required
                  nonce="r@nd0m"
                />
                Category not found? Create a new one below!
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row ms-0">
                  <a href="#!">Create a new Category</a>
                </div>
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
              <Button onClick={handleClose} color="primary" autoFocus>
                Delete
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                OK
              </Button>
            </Fragment>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
