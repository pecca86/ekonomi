import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteAccount } from "../../actions/account/accountActions";

const DeleteAccountModal = ({ account, deleteAccount }) => {

  const onDelete = (e) => {
    deleteAccount(account.account._id);
  };

  return (
    <div id="delete-account-modal" className="modal mt-5">
      <div className="modal-content mb-1">
        <h6>
          Are you sure you want to delete this Account and all Transactions?
        </h6>
        <Link to="/" className="">
          <button onClick={onDelete} className="btn red modal-close">
            Delete
          </button>
        </Link>
        <hr />

        <button className="btn  green modal-close">Cancel</button>
      </div>
    </div>
  );
};

DeleteAccountModal.propTypes = {
  account: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, { deleteAccount })(
  DeleteAccountModal
);
