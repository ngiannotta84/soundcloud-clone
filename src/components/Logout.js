import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import userLogout from "../requests/userLogout";
import "../styles/logout.css";

const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    userLogout();
    handleLogout();
    navigate("/");
  };

  return (
    <div className="logout">
      <h2 className="logout__heading">Are You Sure?</h2>
      <button type="button" onClick={handleClick} className="login__button ">
        Logout
      </button>
    </div>
  );
};

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Logout;
