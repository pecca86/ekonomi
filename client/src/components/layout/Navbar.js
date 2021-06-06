import React, { Fragment } from "react";
import NavbarItem from "./NavbarItem";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Dashboard
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="#!">Logout</Link>
            </li>
            <li>
              <Link to="/profile">{profileIcon}</Link>
            </li>
          </ul>
        </div>
        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
          <li>
            <Link to="#!">Logout</Link>
          </li>
          <li>
            <Link to="/profile">{profileIcon} Profile</Link>
          </li>
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

export default Sidebar;
