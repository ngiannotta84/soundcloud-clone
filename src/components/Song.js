import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { music } from "../media/icons";
import "../styles/song.css";

const Song = ({
  artistName,
  albumName,
  albumArt,
  songName,
  songAudio,
  handleSetPlaylist,
}) => {
  const handleClick = (addNext = false) => {
    const data = {
      image: albumArt,
      artistName,
      albumName,
      songName,
      audio: songAudio,
    };
    handleSetPlaylist(data, addNext);
  };

  return (
    <div className="song">
      <div className="song__info-container">
        <img
          src={albumArt || music}
          alt={`${albumName} cover art`}
          className="song__cover-art"
        />
        <div className="song__info">
          <h2 className="song__artist-name">
            <Link
              to={`/profile/${artistName}`}
              className="song__artist-name__link"
            >
              {artistName}
            </Link>
          </h2>
          <h3 className="song__song-name">{songName}</h3>
        </div>
      </div>
      <div className="song__buttons">
        <button
          type="button"
          className="song__button"
          onClick={() => handleClick()}
        >
          Add to queue
        </button>
        <button
          type="button"
          className="song__button"
          onClick={() => handleClick(true)}
        >
          Play next
        </button>
      </div>
    </div>
  );
};

Song.propTypes = {
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  albumArt: PropTypes.string.isRequired,
  songName: PropTypes.string.isRequired,
  songAudio: PropTypes.string.isRequired,
  handleSetPlaylist: PropTypes.func.isRequired,
};

export default Song;
