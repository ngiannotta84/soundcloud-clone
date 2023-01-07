import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import Alert from "./Alert";
import Loader from "./Loader";
import postAlbums from "../requests/postAlbums";
import postSongs from "../requests/postSongs";

const Upload = ({ userName }) => {
  const [album, setAlbum] = useState({
    name: "",
    image: null,
  });
  const [songs, setSongs] = useState([
    {
      name: "",
      audio: "",
      key: uuid(),
    },
  ]);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAlbumNameChange = (e) => {
    const name = e.target.value;
    setAlbum((prev) => {
      return { ...prev, name };
    });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setAlbum((prev) => {
      return { ...prev, image };
    });
  };

  const addSong = () => {
    const emptySong = {
      name: "",
      audio: "",
      key: uuid(),
    };

    setSongs((prev) => [...prev, emptySong]);
  };

  const removeSong = (index) => {
    setSongs((prev) => {
      const clone = [...prev];
      clone.splice(index, 1);
      return clone;
    });
  };

  const handleSongsName = (e, index) => {
    const name = e.target.value;

    setSongs((prev) => {
      const clone = [...prev];
      clone[index].name = name;
      return clone;
    });
  };

  const handleAudioFile = (event, index) => {
    const file = event.target.files[0];

    setSongs((prev) => {
      const clone = [...prev];
      clone[index].audio = file;
      return clone;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert("");
    setLoading(true);

    try {
      if (!album.name) {
        setAlert("album must contain a name");
        return;
      }

      const { length } = songs;
      for (let i = 0; i < length; i += 1) {
        const song = songs[i];
        if (!song.name || !song.audio) {
          setAlert("all songs must contain a name and audio");
          return;
        }
      }

      const { id: AlbumId } = await postAlbums(album);

      const songPromises = songs.map((song, i) => {
        const data = {
          name: song.name,
          audio: song.audio,
          position: i,
          AlbumId,
        };

        return postSongs(data);
      });

      await Promise.all(songPromises);

      navigate(`/profile/${userName}`);
    } catch (err) {
      setAlert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Loader loading={loading} />
      <Alert message={alert} />
      <h2 className="upload__title">Upload Your Album</h2>
      <form className="upload__form" onSubmit={handleSubmit}>
        <div className="upload__albuminfobox">
          <div>
            <label htmlFor="album-name">
              <h4 className="upload-info">Choose Your Album Name</h4>
              <input
                type="text"
                name="album-name"
                id="album-name"
                value={album}
                onChange={handleAlbumNameChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="albumImage">
              <h4 className="upload-info">Upload Album Image</h4>
              <input
                type="file"
                name="albumImage"
                id="albumImage"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
        <div className="upload__songsinfobox">
          {songs.map((song, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div>
                <div className="songs-info">
                  <label htmlFor={`song-name${index}`}>
                    <h4 className="upload-info">SongName</h4>
                    <input
                      type="text"
                      name="song-name"
                      id={`song-name${index}`}
                      onChange={(event) => handleSongsName(event, index)}
                      value={song.name}
                    />
                  </label>
                </div>
                <div className="songs-info">
                  <label htmlFor={`audio-files${index}`}>
                    <h4 className="upload-info">Upload Your Audio File</h4>
                    <input
                      type="file"
                      name="audio-files"
                      id={`audio-files${index}`}
                      onChange={(event) => handleAudioFile(event, index)}
                    />
                  </label>
                </div>
                <div className="songs-info">
                  <button
                    className="submit-button"
                    type="button"
                    onClick={removeSong}
                  >
                    Remove Song
                  </button>
                </div>
              </div>
            );
          })}
          <div className="add-song-container">
            <button className="add-song-button" type="button" onClick={addSong}>
              Add Song
            </button>
          </div>
        </div>
        <div className="create-an-album-container">
          <button className="create-an-album-button" type="submit">
            Create an Album
          </button>
        </div>
      </form>
    </div>
  );
};

Upload.defaultProps = {
  userName: "",
};

Upload.propTypes = {
  userName: PropTypes.string,
};

export default Upload;
