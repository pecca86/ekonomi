import React, { useEffect } from "react";
// Materialize-css
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { clearCurrentTransaction, clearCurrentTimeInterval } from "../../actions/transaction/transactionActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddBtn = ({ clearCurrentTransaction, clearCurrentTimeInterval }) => {
  useEffect(() => {
    M.AutoInit();
  });

  return (
    <div className="fixed-action-btn">
      <button className="btn-floating btn-large blue darken-2">
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
            onClick={(e) => clearCurrentTimeInterval()}
          >
            <i className="material-icons">date_range</i>
          </a>
        </li>
        <li>
          <a
            href="#add-transaction-modal"
            className="btn-floating green modal-trigger"
            onClick={(e) => clearCurrentTransaction()}
          >
            <i className="material-icons">monetization_on</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

AddBtn.propTypes = {
  clearCurrentTransaction: PropTypes.func,
  clearCurrentTimeInterval: PropTypes.func,
};

export default connect(null, { clearCurrentTransaction, clearCurrentTimeInterval })(AddBtn);
