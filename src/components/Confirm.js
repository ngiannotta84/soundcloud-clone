import React from "react";
import PropTypes from "prop-types";
import "../styles/confirm.css";

const Confirm = ({ callback, setConfirm }) => {
  const handleNo = () => {
    setConfirm(null);
  };

  const handleYes = () => {
    setConfirm(null);
    callback();
  };

  return (
    <div className="confirm--container">
      <div className="confirm">
        <h3 className="confirm__heading">Are You Sure?</h3>
        <button type="button" onClick={handleYes} className="confirm__yes">
          Yes
        </button>
        <button type="button" onClick={handleNo} className="confirm__no">
          No
        </button>
      </div>
    </div>
  );
};

Confirm.propTypes = {
  callback: PropTypes.func.isRequired,
  setConfirm: PropTypes.func.isRequired,
};

export default Confirm;
