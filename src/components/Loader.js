import React from "react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <ClipLoader
      color="#B133B1"
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;
