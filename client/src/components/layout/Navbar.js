import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth/authActions";

const Navbar = ({ logout, isAuthenticated, user }) => {
  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav>
      <div className="container">
        <div className="nav-wrapper">
          {isAuthenticated ? (
            <Link to="/" className="brand-logo">
              Home
              <span><i class="large material-icons">home</i></span>
            </Link>
          ) : (
            <p className="brand-logo">M A N I</p>
          )}
          <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            {!isAuthenticated && (
              <Fragment>
                <li>
                  <Link to="/Login">Login</Link>
                </li>
                <li>
                  <Link to="/Register">Register</Link>
                </li>
              </Fragment>
            )}
            {isAuthenticated && (
              <Fragment>
                <li>
                  <Link to="/login" onClick={onLogout}>
                    Logout
                  </Link>
                </li>
                <li>
                  <Link to="/profile">{profileIcon} {user.firstname} {user.lastname}</Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
        <ul className="sidenav" id="mobile-demo">
          {!isAuthenticated && (
            <Fragment>
              <li>{"-"}</li>
              <li>
                <Link className="sidenav-close" to="/Login">Login</Link>
              </li>
              <li>
                <Link className="sidenav-close" to="/Register">Register</Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated && (
            <Fragment>
              <li>{"-"}</li>
              <li>
                <Link className="sidenav-close" to="/login" onClick={onLogout}>
                  {logOut} Log out
                </Link>
              </li>
              <li>
                <Link className="sidenav-close" to="/profile">{profileIcon} Profile</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

const profileIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-person-circle"
    viewBox="0 0 16 16"
  >
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    <path
      fillRule="evenodd"
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
    />
  </svg>
);

const logOut = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-door-open-fill"
    viewBox="0 0 16 16"
  >
    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
  </svg>
);

Navbar.propTypes = {
  logout: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
