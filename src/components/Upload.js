import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import Alert from "./Alert";
import Loader from "./Loader";
import Confirm from "./Confirm";
import postAlbums from "../requests/postAlbums";
import postSongs from "../requests/postSongs";
import "../styles/upload.css";

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
  const [confirm, setConfirm] = useState("");

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

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    setAlert("");
    setLoading(true);

    try {
      if (!album.name) {
        setAlert("album must contain a name");
        return;
      }

      const { length } = songs;

      if (length === 0) {
        setAlert("album must contain atleast one song");
        return;
      }

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
    <div className="upload">
      <Loader loading={loading} />
      <Alert message={alert} />
      <form className="upload__form">
        <h2 className="upload__title">Upload An Album</h2>
        <div className="upload__album">
          <label htmlFor="album-name" className="upload__label">
            <span className="upload-info">Album Name</span>
            <input
              type="text"
              name="album-name"
              id="album-name"
              value={album.name}
              onChange={handleAlbumNameChange}
              className="upload__text-input"
            />
          </label>
          <label htmlFor="albumImage" className="upload__label">
            <span className="upload-info">Album Art</span>
            <input
              type="file"
              name="albumImage"
              id="albumImage"
              onChange={handleImageChange}
              className="upload__file"
            />
          </label>
        </div>
        {songs.map((song, index) => {
          return (
            <div key={song.key} className="upload__song">
              <h3 className="upload__song__title">Song {index + 1}</h3>
              <label htmlFor={`song-name${index}`} className="upload__label">
                <span className="upload-info">Song Name</span>
                <input
                  type="text"
                  name="song-name"
                  id={`song-name${index}`}
                  onChange={(event) => handleSongsName(event, index)}
                  value={song.name}
                  className="upload__text-input"
                />
              </label>
              <label htmlFor={`audio-files${index}`} className="upload__label">
                <span className="upload-info">Audio</span>
                <input
                  type="file"
                  name="audio-files"
                  id={`audio-files${index}`}
                  onChange={(event) => handleAudioFile(event, index)}
                  className="upload__file"
                />
              </label>
              <button
                className="upload__remove-button"
                type="button"
                onClick={() => removeSong(index)}
              >
                Remove Song
              </button>
            </div>
          );
        })}
        <button type="button" onClick={addSong} className="upload__add-song">
          Add Song
        </button>
        <div className="upload__button-container">
          <button
            type="button"
            className="cancel-button"
            onClick={() => setConfirm("cancel")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="save-button"
            onClick={() => setConfirm("save")}
          >
            Create Album
          </button>
        </div>
      </form>
      {confirm === "cancel" && (
        <Confirm callback={handleCancel} setConfirm={setConfirm} />
      )}
      {confirm === "save" && (
        <Confirm callback={handleSubmit} setConfirm={setConfirm} />
      )}
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
