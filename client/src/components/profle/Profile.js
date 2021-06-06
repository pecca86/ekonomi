import React from "react";

const Profile = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6">
          <div className="card darken-1">
            <div className="card-content black-text">
              <span className="card-title">Edit Profile</span>
              <form>
                <div className="mb-3">
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" name="firstname" id="" value="Janina" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" name="lastname" id="" value="Ranta-aho" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="" value="J9@gmail.com" />
                </div>
              </form>
            </div>
            <div className="card-action">
              <a href="#!">Submit</a>
              <a href="#!">Change password</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
