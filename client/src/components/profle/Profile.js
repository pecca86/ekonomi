import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUser } from "../../actions/auth/authActions";

const Profile = ({ auth, updateUser }) => {
  const { firstname, lastname, email } = auth.user.data;

  const [formData, setFormData] = useState({
    firstname: firstname,
    lastname: lastname,
    email: email,
  });

  // STATE FUNCTIONS
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
    };

    updateUser(data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6">
          <div className="card darken-1">
            <div className="card-content black-text">
              <span className="card-title">Edit Profile</span>
              <form onSubmit={onSubmit} className="form">
                <div className="mb-3">
                  <label htmlFor="firstname">Firstname</label>
                  <input
                    onChange={onChange}
                    type="text"
                    name="firstname"
                    id=""
                    value={formData.firstname}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastname">Lastname</label>
                  <input
                    onChange={onChange}
                    type="text"
                    name="lastname"
                    id=""
                    value={formData.lastname}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={onChange}
                    type="email"
                    name="email"
                    id=""
                    value={formData.email}
                  />
                </div>
                <Link to="/profile/password">Change Password</Link>
                <div className="card-action ps-0">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="SUBMIT"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateUser })(Profile);
