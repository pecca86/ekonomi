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
    <div id="delete-account-modal" className="modal mt-5" style={{height: "275px"}}>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Confirm Deletion of Account</span>
                <p>
                  This action will delete the account and all related
                  transactions. <strong>It can not be undone!</strong>
                </p>
              </div>
              <div className="card-action">
                <Link to="/" className="">
                  <button onClick={onDelete} className="btn red modal-close mb-2">
                    Delete
                  </button>
                </Link>
                <button className="btn  green modal-close mb-2">Cancel</button>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, { deleteAccount })(DeleteAccountModal);
