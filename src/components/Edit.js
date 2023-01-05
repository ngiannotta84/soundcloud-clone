import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Alert from "./Alert";
import Loader from "./Loader";
import getAlbumById from "../requests/getAlbumById";
import deleteAlbum from "../requests/deleteAlbum";
import patchAlbum from "../requests/patchAlbum";
import patchSong from "../requests/patchSong";
import deleteSong from "../requests/deleteSong";
import postSongs from "../requests/postSongs";
import Confirm from "./Confirm";

const Edit = () => {
  const initialState = {
    name: "",
    url: "",
    Songs: [],
  };

  const [original, setOriginal] = useState({
    name: "",
    url: "",
    Songs: [],
  });
  const [album, setAlbum] = useState({
    name: "",
    image: "",
  });
  const [originalSongs, setOriginalSongs] = useState([]);
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
    setOriginalSongs((prev) => {
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
      setOriginalSongs((prev) => {
        const clone = [...prev];
        clone[i].audio = file;
        return clone;
      });
    }
  };

  const handleSongDelete = (e, i) => {
    const { checked } = e.target;
    setOriginalSongs((prev) => {
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

      let songPosition = originalSongs.length;
      const songUpdatePromises = originalSongs.map((song) => {
        if (song.delete) {
          songPosition -= 1;
          return deleteSong(song.id);
        }
        if (song.name || song.audio) {
          const data = {
            name: song.name || undefined,
            audio: song.audio || undefined,
          };
          return patchSong(song.id, data);
        }
        return null;
      });

      const songPostPromises = newSongs.map((song, i) => {
        const data = {
          name: song.name,
          audio: song.audio,
          position: songPosition + i,
          AlbumId: albumId,
        };
        return postSongs(data);
      });

      const promises = albumPromise.concat(
        songUpdatePromises,
        songPostPromises
      );

      await Promise.all(promises);

      navigate(-1);
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
          response.Songs.sort((a, b) => a.position - b.position);
          setOriginal(response);
          const emptySongArray = response.Songs.map((song) => {
            return {
              name: "",
              audio: "",
              delete: false,
              id: song.id,
              key: uuid(),
            };
          });
          setOriginalSongs(emptySongArray);
        } else {
          setOriginal(initialState);
        }
      } catch (err) {
        setOriginal(initialState);
        setAlert("failed to find Album");
      } finally {
        setLoading(false);
      }
    })();
  }, [albumId]);

  return (
    <div>
      <Loader loading={loading} />
      <form>
        <Alert message={alert} />
        <h2>Edit</h2>
        <h3>Edit Album Info</h3>
        <label htmlFor="name">
          <span>Album Name</span>
          <input
            type="text"
            id="name"
            value={album.name}
            placeholder={original.name}
            onChange={handleAlbumNameChange}
          />
        </label>
        <label htmlFor="image">
          <span>Album Artwork</span>
          <input type="file" id="image" onChange={handleImageChange} />
        </label>
        <h3>Edit Songs</h3>
        {originalSongs.map((song, i) => {
          return (
            <div key={`${song.key}`}>
              <label htmlFor={`song name ${i}`}>
                <span>Song {i + 1}</span>
                <input
                  type="text"
                  id={`song name ${i}`}
                  name="name"
                  value={originalSongs[i].name}
                  placeholder={original.Songs[i].name}
                  onChange={(e) => handleSongNameChange(e, i)}
                />
              </label>
              <label htmlFor={`song image ${i}`}>
                <span>Song {i} Audio</span>
                <input
                  type="file"
                  id={`song image ${i}`}
                  onChange={(e) => handleSongFileChange(e, i)}
                />
              </label>
              <label htmlFor={`delete song ${i}`}>
                <span>Delete Song?</span>
                <input
                  type="checkbox"
                  id={`delete song ${i}`}
                  name="delete"
                  checked={originalSongs[i].delete}
                  onChange={(e) => handleSongDelete(e, i)}
                />
              </label>
            </div>
          );
        })}
        <h3>Add Songs</h3>
        {newSongs.map((song, i) => {
          return (
            <div key={song.key}>
              <label htmlFor={`new song name ${i}`}>
                <span>New Song {i + 1}</span>
                <input
                  type="text"
                  id={`new song name ${i}`}
                  name="name"
                  value={newSongs[i].name}
                  onChange={(e) => handleNewSongNameChange(e, i)}
                />
              </label>
              <label htmlFor={`new song image ${i}`}>
                <span>New Song {i + 1} Audio</span>
                <input
                  type="file"
                  id={`new song image ${i}`}
                  onChange={(e) => handleNewSongFileChange(e, i)}
                />
              </label>
              <button type="button" onClick={() => handleDeleteSong(i)}>
                delete
              </button>
            </div>
          );
        })}
        <button type="button" onClick={addSong}>
          Add Song
        </button>
        <div>
          <button type="button" onClick={() => setConfirm("cancel")}>
            Cancel
          </button>
          <button type="button" onClick={() => setConfirm("delete")}>
            Delete Album
          </button>
          <button type="button" onClick={() => setConfirm("save")}>
            Save Changes
          </button>
        </div>
      </form>
      {confirm === "cancel" && (
        <Confirm callback={cancel} setState={setConfirm} />
      )}
      {confirm === "delete" && (
        <Confirm callback={deleteAlbumClick} setState={setConfirm} />
      )}
      {confirm === "save" && (
        <Confirm callback={saveChanges} setState={setConfirm} />
      )}
    </div>
  );
};

export default Edit;
