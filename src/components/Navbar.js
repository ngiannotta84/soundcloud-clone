import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import PropTypes from "prop-types";
import { home, login, logout, profile, search, upload } from "../media/icons";

const Navbar = ({ userName }) => {
  const searchRef = useRef();
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchRef.current.value;
    if (query) {
      navigate(`search/${query}`);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <li className="navbar__links__item">
          <NavLink to="/">
            <h1 className="navbar__links__item__heading">SoundClone</h1>
          </NavLink>
        </li>
        <li className="navbar__links__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar__links__item--active" : null
            }
          >
            <img src={home} alt="home" className="navbar__links__item__img" />
            <span className="navbar__links__item__text">home</span>
          </NavLink>
        </li>
        <li className="navbar__links__search">
          <input type="text" ref={searchRef} placeholder="Search" />
          <button type="button" onClick={handleSearch}>
            <img
              src={search}
              alt="search"
              className="navbar__links__search__img"
            />
          </button>
        </li>
        {!userName ? (
          <li className="navbar__links__item">
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? "navbar__links__item--active" : null
              }
            >
              <img
                src={login}
                alt="login"
                className="navbar__links__item__img"
              />
              <span className="navbar__links__item__text">login</span>
            </NavLink>
          </li>
        ) : (
          <>
            <li className="navbar__links__item">
              <NavLink
                to={`profile/${userName}`}
                className={({ isActive }) =>
                  isActive ? "navbar__links__item--active" : null
                }
              >
                <img
                  src={profile}
                  alt="profile"
                  className="navbar__links__item__img"
                />
                <span className="navbar__links__item__text">profile</span>
              </NavLink>
            </li>
            <li className="navbar__links__item">
              <NavLink
                to="upload"
                className={({ isActive }) =>
                  isActive ? "navbar__links__item--active" : null
                }
              >
                <img
                  src={upload}
                  alt="upload"
                  className="navbar__links__item__img"
                />
                <span className="navbar__links__item__text">upload</span>
              </NavLink>
            </li>
            <li className="navbar__links__item">
              <NavLink
                to="logout"
                className={({ isActive }) =>
                  isActive ? "navbar__links__item--active" : null
                }
              >
                <img
                  src={logout}
                  alt="logout"
                  className="navbar__links__item__img"
                />
                <span className="navbar__links__item__text">logout</span>
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
