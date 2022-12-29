import React from "react";
import PropTypes from "prop-types";

const Confirm = ({ callback, setState }) => {
  const handleNo = () => {
    setState("");
  };

  return (
    <div>
      <h3>Are You Sure?</h3>
      <button type="button" onClick={callback}>
        Yes
      </button>
      <button type="button" onClick={handleNo}>
        No
      </button>
    </div>
  );
};

Confirm.propTypes = {
  callback: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
};

export default Confirm;
