import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import PropTypes from "prop-types";

const Navbar = ({ userName }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className="navbar-links-item">
          <h1>
            <NavLink to="/">SOUNDCLONE</NavLink>
          </h1>
        </li>
        <li className="navbar-links-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="navbar-links-item">
          <NavLink to="search">Search</NavLink>
        </li>
        {!userName ? (
          <li className="navbar-links-item">
            <NavLink to="login">Login</NavLink>
          </li>
        ) : (
          <>
            <li className="navbar-links-item">
              <NavLink to={`profile/${userName}`}>Profile</NavLink>
            </li>
            <li className="navbar-links-item">
              <NavLink to="upload">Upload</NavLink>
            </li>
            <li className="navbar-links-item">
              <NavLink to="logout">Logout</NavLink>
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
