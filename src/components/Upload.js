import { React, useState } from "react";

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
      <span>Upload You Album</span>

      <form className="upload_Form" onSubmit={handleSubmit}>
        <div className="upload_Formfield">
          <label htmlFor="album-name">
            <span>Album Name</span>
            <input
              type="text"
              name="album-name"
              id="album-name"
              value={album}
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
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
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
                    // eslint-disable-next-line no-undef
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
          <button className="submit-button" type="submit" onClick={addSong}>
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
