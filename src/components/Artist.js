import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/artist.css";
import { profile } from "../media/icons";

const Artist = ({ name, image }) => {
  return (
    <div className="artist">
      <Link to={`/profile/${name}`} className="artist__link">
        <img
          src={image || profile}
          alt={`album by ${name}`}
          className="artist__cover-art"
        />
        <h2 className="artist__name">{name}</h2>
      </Link>
    </div>
  );
};

Artist.defaultProps = {
  image: null,
};

Artist.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default Artist;
