import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import getAlbumById from "../requests/getAlbumById";

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

  const handleAlbumNameChange = (e) => {
    const { value } = e.target;
    setAlbum((prev) => {
      return { ...prev, name: [value] };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAlbum((prev) => {
      return { ...prev, image: [file] };
    });
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
    const file = e.target.files[0];
    setOriginalSongs((prev) => {
      const clone = [...prev];
      clone[i].audio = file;
      return clone;
    });
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

  const deleteSong = (i) => {
    setNewSongs((prev) => {
      const clone = [...prev];
      clone.splice(i, 1);
      return clone;
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getAlbumById(albumId);
        if (response) {
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
          <input
            type="file"
            id="image"
            value={album.image}
            onChange={handleImageChange}
          />
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
                  value={originalSongs[i].audio}
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
                <span>New Song {i} Audio</span>
                <input
                  type="file"
                  id={`new song image ${i}`}
                  value={newSongs[i].audio}
                  onChange={(e) => handleNewSongFileChange(e, i)}
                />
              </label>
              <button type="button" onClick={() => deleteSong(i)}>
                delete
              </button>
            </div>
          );
        })}
        <button type="button" onClick={addSong}>
          Add Song
        </button>
      </form>
    </div>
  );
};

export default Edit;
