import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUserPassword } from "../../actions/auth/authActions";
import { setAlert } from '../../actions/alerts/alertActions'

const ChangePassword = ({ auth, updateUserPassword, setAlert }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  });

  // STATE FUNCTIONS
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (formData.newPassword !== formData.newPassword2) {
      setAlert("New Password mismatch!", "danger");
    } else {
      const data = {
        currentPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };
      updateUserPassword(data);

      setFormData({
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6">
          <div className="card darken-1">
            <div className="card-content black-text">
              <span className="card-title">Change Password</span>
              <form className="form" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    onChange={onChange}
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword1">New Password</label>
                  <input
                    onChange={onChange}
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword2">Confirm New Password</label>
                  <input
                    onChange={onChange}
                    type="password"
                    name="newPassword2"
                    value={formData.newPassword2}
                  />
                </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="SUBMIT"
                  />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {
  auth: PropTypes.object.isRequired,
  updateUserPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateUserPassword, setAlert })(ChangePassword);
