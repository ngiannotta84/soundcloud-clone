import React from "react";
import PropTypes from "prop-types";
import { music, play } from "../media/icons";
import "../styles/playlist.css";

const Playlist = ({
  playlist,
  playlistIndex,
  setPlaylistIndex,
  removeFromPlaylist,
  setPlaying,
}) => {
  const handleSetPlaying = (i) => {
    setPlaylistIndex(i);
    setPlaying(true);
  };

  return (
    <div className="playlist">
      {playlist.map((song, i) => {
        return (
          <div
            key={song.key}
            className={`playlist__song ${
              playlistIndex === i && "play__song-active"
            }`}
          >
            <div className="playlist__song-left">
              <img
                src={song.image || music}
                alt={`${song.albumName} cover art`}
                className="playlist__song-cover-art"
              />
            </div>
            <div className="playlist__song-right">
              <div className="playlist__song-info">
                <p className="playlist__song-artist">{song.artistName}</p>
                <p className="playlist__song-name">{song.songName}</p>
              </div>
              <button
                type="button"
                className="playlist__play-now"
                onClick={() => handleSetPlaying(i)}
              >
                <img src={play} alt="play now" />
              </button>
              <button
                type="button"
                className="playlist__remove"
                onClick={() => removeFromPlaylist(i)}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Playlist.defaultProps = {
  playlist: null,
};

Playlist.propTypes = {
  playlist: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      artistName: PropTypes.string,
      albumName: PropTypes.string,
      audio: PropTypes.string,
      songName: PropTypes.string,
    })
  ),
  playlistIndex: PropTypes.number.isRequired,
  setPlaylistIndex: PropTypes.func.isRequired,
  removeFromPlaylist: PropTypes.func.isRequired,
  setPlaying: PropTypes.func.isRequired,
};

export default Playlist;
