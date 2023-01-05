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
      <h2>Upload You Album</h2>
      <form className="upload_Form" onSubmit={handleSubmit}>
        <div className="upload_Formfield">
          <label htmlFor="album-name">
            <span>Album Name</span>
            <input
              type="text"
              name="album-name"
              id="album-name"
              value={album.name}
              onChange={handleAlbumNameChange}
            />
          </label>
        </div>
        <div className="upload_Formfield">
          <label htmlFor="albumImage">
            <span>File Image</span>
            <input
              type="file"
              name="albumImage"
              id="albumImage"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="upload_Formfield">
          {songs.map((song, index) => {
            return (
              <div key={song.key}>
                <label htmlFor={`song-name${index}`}>
                  <span>SongName</span>
                  <input
                    type="text"
                    name="song-name"
                    id={`song-name${index}`}
                    onChange={(event) => handleSongsName(event, index)}
                    value={song.name}
                  />
                </label>
                <label htmlFor={`audio-files${index}`}>
                  <span>Audio Files</span>
                  <input
                    type="file"
                    name="audio-files"
                    id={`audio-files${index}`}
                    onChange={(event) => handleAudioFile(event, index)}
                  />
                </label>
                <button
                  className="submit-button"
                  type="button"
                  onClick={() => removeSong(index)}
                >
                  Remove Song
                </button>
              </div>
            );
          })}
          <button className="submit-button" type="button" onClick={addSong}>
            Add Song
          </button>
          <button className="submit-button" type="submit">
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
