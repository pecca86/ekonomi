import React, { Fragment, useState } from "react";
import Chip from "@material-ui/core/Chip";
import Select from "react-select";
import AlertDialog from "./AlertDialog";

const AccountTransactionBtns = ({ onClick, showDelete, onDeleteMany }) => {
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
            <div className="col col-md-2">
              <Select
                name="category"
                id="category"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                required
                nonce="r@nd0m"
              />
            </div>
            <div className="col col-md-2">
              <AlertDialog dialogTitle={selectedOption} />
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
