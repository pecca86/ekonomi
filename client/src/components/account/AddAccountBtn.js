import React from "react";

const AddAccountBtn = () => {
  return (
    <div className="fixed-action-btn-top hoverEnabled">
      <button className="btn-floating btn-small blue darken-2">
        <a
          href="#add-account-modal"
          className="modal-trigger"
        >
          <i className="material-icons">account_balance</i>
        </a>
      </button>
    </div>
  );
};

export default AddAccountBtn;
