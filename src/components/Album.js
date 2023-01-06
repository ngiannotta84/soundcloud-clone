import React from "react";
import PropTypes from "prop-types";
import "../styles/album.css";
import { Link } from "react-router-dom";
import { music } from "../media/icons";

const Album = ({
  artistName,
  albumName,
  albumArt,
  songs,
  handleSetPlaylist,
  albumUserId,
  userId,
  albumId,
}) => {
  const songData = (song) => {
    return {
      image: albumArt,
      artistName,
      albumName,
      songName: song.name,
      audio: song.url,
    };
  };

  const handleClickSong = (song, addNext = false) => {
    const data = songData(song);
    handleSetPlaylist(data, addNext);
  };

  const handleClickAlbum = (addNext = false) => {
    const { length } = songs;

    if (addNext) {
      for (let i = length - 1; i >= 0; i -= 1) {
        const data = songData(songs[i]);
        handleSetPlaylist(data, addNext);
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        const data = songData(songs[i]);
        handleSetPlaylist(data, addNext);
      }
    }
  };

  return (
    <div className="album">
      <div className="album__info-container">
        <img
          src={albumArt || music}
          alt={`${albumName} cover art`}
          className="album__cover-art"
        />
        <div className="album__info">
          <h2 className="album__artist-name">
            <Link to={`/profile/${artistName}`}>{artistName}</Link>
          </h2>
          <h3 className="album__album-name">{albumName}</h3>
        </div>
        <div className="album__buttons">
          <button
            type="button"
            className="addSong-button addSong-large"
            onClick={() => handleClickAlbum()}
          >
            Add Album to queue
          </button>
          <button
            type="button"
            className="addSong-button addSong-large"
            onClick={() => handleClickAlbum(true)}
          >
            Play Album next
          </button>
          {userId !== null && userId === albumUserId && (
            <Link
              to={`/edit/${albumId}`}
              className="album__buttons__link addSong-large"
            >
              Edit
            </Link>
          )}
        </div>
      </div>
      <li className="album__songs">
        {songs.map((song) => {
          return (
            <ul key={song.id} className="album__song">
              <h4 className="album__song__song-name">{song.name}</h4>
              <div>
                <button
                  type="button"
                  className="addSong-button album__song__button"
                  onClick={() => handleClickSong(song)}
                >
                  Add to queue
                </button>
                <button
                  type="button"
                  className="addSong-button album__song__button"
                  onClick={() => handleClickSong(song, true)}
                >
                  Play next
                </button>
              </div>
            </ul>
          );
        })}
      </li>
    </div>
  );
};

Album.defaultProps = {
  albumUserId: null,
  userId: null,
  albumId: null,
};

Album.propTypes = {
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  albumArt: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  handleSetPlaylist: PropTypes.func.isRequired,
  albumUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  albumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Album;
