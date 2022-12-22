import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import PropTypes from "prop-types";

const Navbar = ({ userName }) => {
  const searchRef = useRef();
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchRef.current.value;
    navigate(`search/${query}`);
  };

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
          <input type="text" ref={searchRef} />
          <button type="button" onClick={handleSearch}>
            search
          </button>
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
