import React from "react";

const ChangePassword = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6">
          <div className="card darken-1">
            <div className="card-content black-text">
              <span className="card-title">Change Password</span>
              <form>
                <div className="mb-3">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input type="password" name="oldPassword" id="" />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword1">New Password</label>
                  <input type="password" name="lastname" id="" />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword2">Confirm New Password</label>
                  <input type="password" name="newPassword2" id="" />
                </div>
              </form>
            </div>
            <div className="card-action">
              <a href="#!">Submit</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
