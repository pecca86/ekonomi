import React from "react";

const AddBtn = () => {
  return (
    <div className="fixed-action-btn hoverEnabled">
      <button
        className="btn-floating btn-large blue darken-2"
      >
        <i className="large material-icons">add</i>
      </button>
      <ul>
        <li>
          <a
            href="#delete-account-modal"
            className="btn-floating red modal-trigger"
          >
            <i className="material-icons">delete_forever</i>
          </a>
        </li>
        <li>
          <a
            href="#add-timeintervall-modal"
            className="btn-floating green modal-trigger"
          >
            <i className="material-icons">date_range</i>
          </a>
        </li>
        <li>
          <a
            href="#add-transaction-modal"
            className="btn-floating green modal-trigger"
          >
            <i className="material-icons">monetization_on</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddBtn;
