import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createAccount } from "../../actions/account/accountActions";

const AddAccountModal = ({ createAccount }) => {
  const [formData, setFormData] = useState({
    name: "",
    IBAN: "",
    balance: 0,
    accountType: "",
  });

  // STATE FUNCTIONS
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createAccount(formData);
  };

  return (
    <div id="add-account-modal" className="modal mt-5">
      <div className="modal-content mb-3">
        <h4>Create a new account</h4>
        <form onSubmit={onSubmit}>
          {/* NAME */}
          <label htmlFor="name" className="active">
            Account Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Savings, loan etc."
            value={formData.name}
            onChange={onChange}
          ></input>
          {/* IBAN */}
          <label htmlFor="IBAN" className="active">
            IBAN
          </label>
          <input
            type="text"
            name="IBAN"
            className="form-control"
            placeholder="eg. FI29 1111 2222 3333 44"
            value={formData.IBAN}
            onChange={onChange}
          ></input>
          {/* BALANCE */}
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="number"
              name="balance"
              id="floatingSum"
              placeholder="Account Balance"
              value={formData.balance}
              onChange={onChange}
            />
            <label htmlFor="floatingSum">Current Balance</label>
          </div>
          {/* ACCOUNTTYPE */}
          <select className="" onChange={onChange} name="accountType">
            <option defaultValue>Account Type</option>
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
          </select>

          <button className="btn btn-success modal-close">Submit</button>
        </form>
      </div>
    </div>
  );
};

AddAccountModal.propTypes = {
  createAccount: PropTypes.func.isRequired,
};

export default connect(null, { createAccount })(AddAccountModal);
