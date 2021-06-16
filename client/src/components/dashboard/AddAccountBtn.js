import React, { Fragment, useState } from "react";
import { Modal, Button } from "react-materialize";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createAccount } from "../../actions/account/accountActions";

const AddAccountBtn = ({ createAccount }) => {
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

  const trigger = <Button className="mt-4 btn-floating btn-small blue darken-2"><i className="material-icons">account_balance</i></Button>;
  return (
    <div>
      <Modal header="Add an Account" trigger={trigger}>
        <Fragment>
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
            <button className="btn btn-success modal-close">Submit</button>
          </form>
        </Fragment>
      </Modal>
    </div>
  );
};

AddAccountBtn.propTypes = {
  createAccount: PropTypes.func.isRequired,
};

export default connect(null, { createAccount })(AddAccountBtn);
