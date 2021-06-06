import React from "react";

const AddAccountModal = () => {
  return (
    <div id="add-account-modal" className="modal mt-5">
      <div className="modal-content mb-3">
        <h4>Create a new account</h4>
        <form action="">
          {/* NAME */}
          <label htmlFor="accountName" className="active">
            Account Name
          </label>
          <input
            type="text"
            name="accountName"
            className="form-control"
            id=""
            placeholder="Savings, loan etc."
          ></input>
          {/* IBAN */}
          <label htmlFor="IBAN" className="active">
            IBAN
          </label>
          <input
            type="text"
            name="IBAN"
            className="form-control"
            id=""
            placeholder="eg. FI29 1111 2222 3333 44"
          ></input>
          {/* BALANCE */}
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="number"
              name="sum"
              id="floatingSum"
              placeholder="Account Balance"
            />
            <label htmlFor="floatingSum">Current Balance</label>
          </div>
          {/* ACCOUNTTYPE */}
          <select className="">
            <option defaultValue>Account Type</option>
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
          </select>

          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddAccountModal;
