import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import PropTypes from "prop-types";

const Navbar = ({ userName }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <NavLink className="navbar-links-item" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-links-item" to="search">
            Search
          </NavLink>
        </li>
        {!userName ? (
          <li>
            <NavLink className="navbar-links-item" to="login">
              Login
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink className="navbar-links-item" to={`profile/${userName}`}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink className="navbar-links-item" to="upload">
                Upload
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  userName: null,
};

Navbar.propTypes = {
  userName: PropTypes.string,
};

export default Navbar;
