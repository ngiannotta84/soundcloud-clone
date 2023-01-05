import React from "react";
import PropTypes from "prop-types";
import "../styles/confirm.css";

const Confirm = ({ callback, setState }) => {
  const handleNo = () => {
    setState(null);
  };

  return (
    <div className="confirm--container">
      <div className="confirm">
        <h3 className="confirm__heading">Are You Sure?</h3>
        <button type="button" onClick={callback} className="confirm__yes">
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
  setState: PropTypes.func.isRequired,
};

export default Confirm;
