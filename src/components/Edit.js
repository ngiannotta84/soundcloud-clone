/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Alert from "./Alert";
import getAlbumById from "../requests/getAlbumById";
import deleteAlbum from "../requests/deleteAlbum";
import patchAlbum from "../requests/patchAlbum";
import patchSong from "../requests/patchSong";
import deleteSong from "../requests/deleteSong";
import postSongs from "../requests/postSongs";

const Edit = () => {
  const initialState = {
    name: "",
    url: "",
    Songs: [],
  };
  const [original, setOriginal] = useState(initialState);
  const [album, setAlbum] = useState({
    name: "",
    image: "",
  });
  const [originalSongs, setOriginalSongs] = useState([]);
  const [newSongs, setNewSongs] = useState([]);
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  console.log(originalSongs);

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
      await deleteAlbum(albumId);
      navigate(-1);
    } catch (err) {
      setAlert("failed to delete album");
    }
  };

  const saveChanges = async () => {
    try {
      setAlert("");
      const { length: newSongLength } = newSongs;
      for (let i = 0; i < newSongLength; i += 1) {
        const song = newSongs[i];
        if (!song.name || !song.audio) {
          setAlert("all new songs must contain a name and audio");
          return;
        }
      }
      if (album.name || album.image) {
        const data = {};
        if (album.name) data.name = album.name;
        if (album.image) data.image = album.image;
        await patchAlbum(albumId, data);
      }
      let songPosition = originalSongs.length;
      const { length: originalSongsLength } = originalSongs;
      for (let i = 0; i < originalSongsLength; i += 1) {
        const song = originalSongs[i];
        if (song.delete) {
          await deleteSong(song.id);
          songPosition -= 1;
        } else if (song.name || song.audio) {
          const data = {};
          if (song.name) data.name = song.name;
          if (song.audio) data.audio = song.audio;
          await patchSong(song.id, data);
        }
      }
      for (let i = 0; i < newSongLength; i += 1) {
        const data = {
          name: newSongs[i].name,
          audio: newSongs[i].audio,
          position: songPosition + i,
          AlbumId: albumId,
        };
        await postSongs(data);
      }
      navigate(-1);
    } catch (err) {
      setAlert(err.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
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
      }
    })();
  }, [albumId]);

  return (
    <div>
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
          <button type="button" onClick={cancel}>
            Cancel
          </button>
          <button type="button" onClick={deleteAlbumClick}>
            Delete Album
          </button>
          <button type="button" onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
