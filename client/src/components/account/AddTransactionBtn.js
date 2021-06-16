import React, { Fragment, useState } from "react";
import { Modal, Button, Select } from "react-materialize";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createTransaction } from "../../actions/transaction/transactionActions";

const AddTransactionBtn = ({ createTransaction, account }) => {
  const [formData, setFormData] = useState({
    sum: 0,
    transactionType: "",
    description: "",
    transactionDate: "",
  });

  // STATE FUNCTIONS
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createTransaction(formData, account.account._id);
  };

  // Button that triggers the modal
  const trigger = (
      <Button className="mt-4 btn-floating btn-small blue darken-2">
        <i className="material-icons">monetization_on</i>
      </Button>
  );

  return (
    <Modal header="Add an Account" trigger={trigger}>
      <Fragment>
        <form onSubmit={onSubmit}>
          {/* DATE */}
          <label htmlFor="transactionDate" className="active">
            Transaction Date
          </label>
          <input
            type="date"
            name="transactionDate"
            value={formData.transactionDate}
            onChange={onChange}
            required
          />

          {/* TYPE */}
          <Select browserDefault className="" onChange={onChange} name="transactionType">
            <option defaultValue>Transaction Type</option>
            <option value="Income">Income</option>
            <option value="Spending">Spending</option>
          </Select>

          {/* DESCRIPTION */}
          <label htmlFor="description" className="active">
            Description
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Paycheck, bills etc."
            value={formData.description}
            onChange={onChange}
          ></input>

          {/* SUM */}
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="number"
              name="sum"
              id="floatingSum"
              placeholder="Transaction sum"
              value={formData.sum}
              onChange={onChange}
            />
            <label htmlFor="floatingSum">Transaction Sum (i.e. 4.30)</label>
          </div>
          <button className="btn btn-success modal-close">Submit</button>
        </form>
      </Fragment>
    </Modal>
  );
};

AddTransactionBtn.propTypes = {
  createTransaction: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, { createTransaction })(
  AddTransactionBtn
);
