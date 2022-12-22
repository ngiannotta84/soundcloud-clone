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
  const emptysong = {
    songName: "",
    audioFile: "",
  };
  const [songs, setSongs] = useState([emptysong]);
  const addSong = () => {
    setSongs((prev) => [...prev, emptysong]);
  };
  const handleSongsChange = (e) => {
    setSongs(e.target.files[0]);
  };

  const uploadAlbum = (e) => {
    e.preventDefault();
    const FinalState = {
      albumName: album,
      imageFile: image,
      Songs: [
        {
          songName: songs.name,
          audioFile: songs,
        },
      ],
    };
    return FinalState;
  };
  return (
    <div>
      <span>Upload You Album</span>

      <form className="upload_Form" onSubmit={uploadAlbum}>
        <div className="upload_Formfield">
          <label htmlFor="album-name">
            <span>Album Name</span>
            <input
              type="text"
              name="album-name"
              id="album-name"
              value={album.albumName}
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
          <label htmlFor="audio-files">
            <span>Audio Files</span>
            <input
              type="file"
              name="audio-files"
              id="audio-files"
              onChange={handleSongsChange}
            />
          </label>
          {songs.map((song, index) => {
            return (
            

             )
          })}
          <button className="submit-button" type="submit" onClick={addSong}>
            Add Song
          </button>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
