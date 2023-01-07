import { React, useState } from "react";
import "../styles/upload.css";

const Upload = () => {
  const [album, setAlbum] = useState("");
  const handleAlbumNameChange = (e) => {
    setAlbum(e.target.value);
  };
  const [image, setImage] = useState("");
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const createAlbum = {
      albumName: album,
      imageFile: image,
    };
    return createAlbum;
  };
  const emptysong = {
    songName: "",
    audioFile: "",
  };
  const [songs, setSongs] = useState([emptysong]); // the state is just an array with and instance of empty song inside this means you can create an album with an empty song to start with//
  // eslint-disable-next-line no-unused-vars
  const addSong = () => {
    setSongs((prev) => [...prev, emptysong]);
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
      clone[index].songName = name; // get just the clone instance with the specified index(its like saying array[0].songname) and set it to the value given into the text box(event)//
      return clone;
    });
  };
  const handleAudioFile = (event, index) => {
    const file = event.target.files[0];
    setSongs((prev) => {
      const clone = [...prev];
      clone[index].audioFile = file;
      return clone;
    });
  };
  return (
    <div>
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
                    type="submit"
                    onClick={removeSong}
                  >
                    Remove Song
                  </button>
                </div>
              </div>
            );
          })}
          <div className="add-song-container">
            <button className="add-song-button" type="submit" onClick={addSong}>
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

export default Upload;
