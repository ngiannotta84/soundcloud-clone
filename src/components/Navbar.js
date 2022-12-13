import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logosound.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="logo soundcloud" />
      <ul className="navbar-links">
        <li>
          <Link className="navbar-links-item" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navbar-links-item" to="login">
            Login
          </Link>
        </li>
        <li>
          <Link className="navbar-links-item" to="profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="navbar-links-item" to="search">
            Search
          </Link>
        </li>
        <li>
          <Link className="navbar-links-item" to="upload">
            Upload
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
