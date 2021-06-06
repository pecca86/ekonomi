import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Fragment>
      <div className="container">
        <h4 className="large text-dark">Sign Up</h4>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form">
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Register;
