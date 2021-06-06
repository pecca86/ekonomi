import React from "react";

const DeleteAccountModal = () => {
  return (
    <div id="delete-account-modal" className="modal mt-5">
      <div className="modal-content mb-3">
        <h4>Confirm deletion of account and corresponding transactions</h4>
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          <button className="btn red">DELETE</button>
        </a>
        <hr />

        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          <button className="btn">CANCEL</button>
        </a>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
