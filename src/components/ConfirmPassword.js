import React, { useRef } from "react";
import PropTypes from "prop-types";
import "../styles/confirm.css";

const ConfirmPassword = ({ callback, setConfirm }) => {
  const passwordRef = useRef();

  const handleCancel = () => {
    setConfirm(null);
  };

  const handleDelete = () => {
    const password = passwordRef.current.value;
    callback(password);
  };

  return (
    <div className="profile__confirm-password--container">
      <div className="profile__confirm-password">
        <label
          htmlFor="confirm-password"
          className="profile__confirm-password__label"
        >
          <span className="profile__confirm-password__label-text">
            Confirm Password
          </span>
          <input type="password" ref={passwordRef} id="confirm-password" />
        </label>
        <button
          type="button"
          onClick={handleDelete}
          className="profile__confirm-password__confirm"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="profile__confirm-password__cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

ConfirmPassword.propTypes = {
  callback: PropTypes.func.isRequired,
  setConfirm: PropTypes.func.isRequired,
};

export default ConfirmPassword;
