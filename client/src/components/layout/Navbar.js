import React, { Fragment } from "react";
import NavbarItem from "./NavbarItem";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Dashboard
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link" href="!#">
              Login
            </a>
            <a className="nav-link" href="!#">
              Register
            </a>
            <a className="nav-link" href="!#">
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
