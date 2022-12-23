import React from "react";
import PropTypes from "prop-types";
import "../styles/album.css";
import { music } from "../media/icons";

const Album = ({
  artistName,
  albumName,
  albumArt,
  songs,
  handleSetPlaylist,
}) => {
  const orderedSongs = songs.sort(
    (a, b) => Number(a.position) - Number(b.position)
  );

  const handleClick = (song, addNext = false) => {
    const data = {
      image: albumArt,
      artistName,
      albumName,
      songName: song.name,
      audio: song.url,
    };
    handleSetPlaylist(data, addNext);
  };

  return (
    <div className="album">
      <div className="album__info-container">
        <img
          src={albumArt || music}
          alt={`${albumName} cover art`}
          className="album__cover-art"
        />
        <div>
          <h2 className="album__artist-name">{artistName}</h2>
          <h3 className="album__album-name">{albumName}</h3>
        </div>
      </div>
      <div>
        {orderedSongs.map((song) => {
          return (
            <div key={song.id} className="album__song">
              <h4 className="album__song__song-name">{song.name}</h4>
              <div>
                <button
                  type="button"
                  className="album__song__add-song"
                  onClick={() => handleClick(song)}
                >
                  Add to queue
                </button>
                <button
                  type="button"
                  className="album__song__add-song"
                  onClick={() => handleClick(song, true)}
                >
                  Play next
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
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
};

export default Album;
