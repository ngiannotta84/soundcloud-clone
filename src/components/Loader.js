import React from "react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import "../styles/loader.css";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader">
      <ClipLoader
        color="#B133B1"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;
