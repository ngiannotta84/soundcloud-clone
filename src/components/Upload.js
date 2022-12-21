import { React, useState } from "react";

const Upload = () => {
  const [album, setAlbum] = useState("");
  const handleAlbumNameChange = (e) => {
    setAlbum((prev) => ({
      ...prev,
      albumName: e.target.value,
    }));
  };
  const [Image, setImage] = useState("");
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const [songs, setSongs] = useState([]);
  const handleSongsChange = (e) => {
    setSongs(e.target.files);
  };
  const uploadAlbum = (e) => {
    e.preventDefault();
    const initialState = {
      albumName: album,
      imageFile: Image,
      Songs: songs.map((song) => ({
        songName: song.name,
        audioFile: song,
      })),
    };
    console.log(initialState);
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
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
