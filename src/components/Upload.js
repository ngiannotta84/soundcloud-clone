/* eslint-disable no-await-in-loop */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Alert from "./Alert";
import postAlbums from "../requests/postAlbums";
import postSongs from "../requests/postSongs";

const Upload = () => {
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

      for (let i = 0; i < length; i += 1) {
        const data = {
          name: songs[i].name,
          audio: songs[i].audio,
          position: i,
          AlbumId,
        };

        await postSongs(data);
      }
      navigate(-1);
    } catch (err) {
      setAlert(err.message);
    }
  };

  return (
    <div>
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
                  type="submit"
                  onClick={removeSong}
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

export default Upload;
