import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import Alert from "./Alert";
import Loader from "./Loader";
import Confirm from "./Confirm";
import getAlbumById from "../requests/getAlbumById";
import deleteAlbum from "../requests/deleteAlbum";
import patchAlbum from "../requests/patchAlbum";
import patchSong from "../requests/patchSong";
import deleteSong from "../requests/deleteSong";
import postSongs from "../requests/postSongs";

const EditAlbum = ({ userName }) => {
  const initialState = {
    name: "",
    Songs: [],
  };

  const [placeHolders, setPlaceHolders] = useState(initialState);
  const [album, setAlbum] = useState({});
  const [editSongs, setEditSongs] = useState([]);
  const [newSongs, setNewSongs] = useState([]);
  const [alert, setAlert] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const { albumId } = useParams();
  const navigate = useNavigate();

  const handleAlbumNameChange = (e) => {
    const { value } = e.target;
    setAlbum((prev) => {
      return { ...prev, name: value };
    });
  };

  const handleImageChange = (e) => {
    setAlert("");
    const file = e.target.files[0];
    if (file.type.split("/")[0] !== "image") {
      setAlert("Album art must be of type image");
    } else {
      setAlbum((prev) => {
        return { ...prev, image: file };
      });
    }
  };

  const handleSongNameChange = (e, i) => {
    const { name, value } = e.target;
    setEditSongs((prev) => {
      const clone = [...prev];
      clone[i][name] = value;
      return clone;
    });
  };

  const handleSongFileChange = (e, i) => {
    setAlert("");
    const file = e.target.files[0];
    if (file.type.split("/")[0] !== "audio") {
      setAlert("Songs files must be of type audio");
    } else {
      setEditSongs((prev) => {
        const clone = [...prev];
        clone[i].audio = file;
        return clone;
      });
    }
  };

  const handleSongDelete = (e, i) => {
    const { checked } = e.target;
    setEditSongs((prev) => {
      const clone = [...prev];
      clone[i].delete = checked;
      return clone;
    });
  };

  const handleNewSongNameChange = (e, i) => {
    const { name, value } = e.target;
    setNewSongs((prev) => {
      const clone = [...prev];
      clone[i][name] = value;
      return clone;
    });
  };

  const handleNewSongFileChange = (e, i) => {
    const file = e.target.files[0];
    setNewSongs((prev) => {
      const clone = [...prev];
      clone[i].audio = file;
      return clone;
    });
  };

  const addSong = () => {
    setNewSongs((prev) => [
      ...prev,
      {
        name: "",
        image: "",
        key: uuid(),
      },
    ]);
  };

  const handleDeleteSong = (i) => {
    setNewSongs((prev) => {
      const clone = [...prev];
      clone.splice(i, 1);
      return clone;
    });
  };

  const cancel = () => {
    navigate(-1);
  };

  const deleteAlbumClick = async () => {
    try {
      setLoading(true);
      await deleteAlbum(albumId);
      navigate(-1);
    } catch (err) {
      setAlert("failed to delete album");
    } finally {
      setLoading(false);
    }
  };

  const saveChanges = async () => {
    try {
      setAlert("");
      setLoading(true);

      const { length: newSongLength } = newSongs;
      for (let i = 0; i < newSongLength; i += 1) {
        const song = newSongs[i];
        if (!song.name || !song.audio) {
          setAlert("all new songs must contain a name and audio");
          return;
        }
      }

      const albumPromise = [];

      if (album.name || album.image) {
        const data = {
          name: album.name || undefined,
          image: album.image || undefined,
        };
        albumPromise.push(patchAlbum(albumId, data));
      }

      let position = 0;
      const songUpdatePromises = editSongs.map((song, i) => {
        if (song.delete) {
          return deleteSong(song.id);
        }
        const songPosition = Number(placeHolders.Songs[i].position);
        if (song.name || song.audio || position !== songPosition) {
          const data = {
            name: song.name || undefined,
            audio: song.audio || undefined,
            position: position === songPosition ? undefined : position,
          };
          position += 1;
          return patchSong(song.id, data);
        }
        position += 1;
        return null;
      });

      const songPostPromises = newSongs.map((song) => {
        const data = {
          name: song.name,
          audio: song.audio,
          position,
          AlbumId: albumId,
        };
        position += 1;
        return postSongs(data);
      });

      const promises = albumPromise.concat(
        songUpdatePromises,
        songPostPromises
      );

      await Promise.all(promises);

      navigate(`/profile/${userName}`);
    } catch (err) {
      setAlert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getAlbumById(albumId);
        if (response) {
          setPlaceHolders(response);
          const emptySongArray = response.Songs.map((song) => {
            return {
              name: "",
              audio: "",
              delete: false,
              id: song.id,
              key: uuid(),
            };
          });
          setEditSongs(emptySongArray);
        } else {
          setPlaceHolders(initialState);
        }
      } catch (err) {
        setPlaceHolders(initialState);
        setAlert("failed to find Album");
      } finally {
        setLoading(false);
      }
    })();
  }, [albumId]);

  return (
    <div className="upload">
      <Loader loading={loading} />
      <Alert message={alert} />
      <form className="upload__form">
        <h2 className="upload__title--large">Edit Album</h2>
        <div className="upload__album">
          <label htmlFor="name" className="upload__label">
            <span className="upload-info">Album Name</span>
            <input
              type="text"
              id="name"
              value={album.name}
              placeholder={placeHolders.name}
              onChange={handleAlbumNameChange}
            />
          </label>
          <label htmlFor="image" className="upload__label">
            <span className="upload-info">Album Artwork</span>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="upload__file"
            />
          </label>
        </div>
        <h3 className="upload__title--large">Edit Songs</h3>
        {editSongs.map((song, i) => {
          return (
            <div key={`${song.key}`} className="upload__song">
              <h3 className="upload__song__title">Song {i + 1}</h3>
              <label htmlFor={`song name ${i}`} className="upload__label">
                <span className="upload-info">Song Name</span>
                <input
                  type="text"
                  id={`song name ${i}`}
                  name="name"
                  value={editSongs[i].name}
                  placeholder={placeHolders.Songs[i].name}
                  onChange={(e) => handleSongNameChange(e, i)}
                  className="upload__text-input"
                />
              </label>
              <label htmlFor={`song image ${i}`} className="upload__label">
                <span className="upload-info">Audio</span>
                <input
                  type="file"
                  id={`song image ${i}`}
                  onChange={(e) => handleSongFileChange(e, i)}
                  className="upload__file"
                />
              </label>
              <label htmlFor={`delete song ${i}`}>
                <span className="upload-info">Delete Song?</span>
                <input
                  type="checkbox"
                  id={`delete song ${i}`}
                  name="delete"
                  checked={editSongs[i].delete}
                  onChange={(e) => handleSongDelete(e, i)}
                />
              </label>
            </div>
          );
        })}
        <h3 className="upload__title--large">Add Songs</h3>
        {newSongs.map((song, i) => {
          return (
            <div key={song.key} className="upload__song">
              <h3 className="upload__song__title">New Song {i + 1}</h3>
              <label htmlFor={`new song name ${i}`} className="upload__label">
                <span className="upload-info">Song Name</span>
                <input
                  type="text"
                  id={`new song name ${i}`}
                  name="name"
                  value={newSongs[i].name}
                  onChange={(e) => handleNewSongNameChange(e, i)}
                  className="upload__text-input"
                />
              </label>
              <label htmlFor={`new song image ${i}`} className="upload__label">
                <span className="upload-info">Audio</span>
                <input
                  type="file"
                  id={`new song image ${i}`}
                  onChange={(e) => handleNewSongFileChange(e, i)}
                  className="upload__file"
                />
              </label>
              <button type="button" onClick={() => handleDeleteSong(i)}>
                Remove Song
              </button>
            </div>
          );
        })}
        <button type="button" onClick={addSong} className="upload__button">
          Add Song
        </button>
        <div>
          <button
            type="button"
            onClick={() => setConfirm("cancel")}
            className="upload__button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setConfirm("delete")}
            className="upload__button"
          >
            Delete Album
          </button>
          <button
            type="button"
            onClick={() => setConfirm("save")}
            className="upload__button"
          >
            Save Changes
          </button>
        </div>
      </form>
      {confirm === "cancel" && (
        <Confirm callback={cancel} setConfirm={setConfirm} />
      )}
      {confirm === "delete" && (
        <Confirm callback={deleteAlbumClick} setConfirm={setConfirm} />
      )}
      {confirm === "save" && (
        <Confirm callback={saveChanges} setConfirm={setConfirm} />
      )}
    </div>
  );
};

EditAlbum.defaultProps = {
  userName: "",
};

EditAlbum.propTypes = {
  userName: PropTypes.string,
};

export default EditAlbum;
