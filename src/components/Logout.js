import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import userLogout from "../requests/userLogout";

const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    userLogout();
    handleLogout();
    navigate("/");
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Logout;