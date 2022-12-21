import React from "react";
import PropTypes from "prop-types";
import "../styles/album.css";

const Album = ({ artistName, albumName, albumArt, songs }) => {
  const orderedSongs = songs.sort(
    (a, b) => Number(a.position) - Number(b.position)
  );

  return (
    <div className="album">
      <div className="album__info-container">
        <img
          src={albumArt}
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
              <button type="button" className="album__song__add-song">
                Add to queue
              </button>
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
};

export default Album;
