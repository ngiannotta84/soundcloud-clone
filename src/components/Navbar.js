import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <NavLink className="navbar-links-item" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-links-item" to="login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-links-item" to="profile">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-links-item" to="search">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-links-item" to="upload">
            Upload
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
