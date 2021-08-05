import React, { Fragment } from "react";
import Chip from "@material-ui/core/Chip";
import AlertDialog from "./AlertDialog";

const AccountTransactionBtns = ({ onClick, showDelete }) => {

  return (
    <Fragment>
      {showDelete ? (
        <div className="row">
          <Fragment>
            <div className="col col-md-2">
              <Chip
                onClick={onClick}
                label="Cancel"
                clickable
                color="primary"
                nonce="r@nd0m"
              />
            </div>

            <div className="col col-md-6">
              <AlertDialog dialogTitle="TEST" />
            </div>
          </Fragment>
        </div>
      ) : (
        <Fragment>
          <div className="col col-md-6">
            <Chip
              onClick={onClick}
              label="Select Many"
              clickable
              color="default"
              nonce="r@nd0m"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AccountTransactionBtns;
