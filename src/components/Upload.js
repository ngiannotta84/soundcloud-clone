import { React, useState } from "react";

const Upload = () => {
  const initialState = {
    albumName: "",
    imageFile: "",
    Songs: [{ songName: "", audioFile: "" }],
  };
  const [album, setAlbum] = useState(initialState);
  const handleAlbumNameChange = (e) => {
    setAlbum((prev) => ({
      ...prev,
      albumName: e.target.value,
    }));
  };

  const [Image, setImage] = useState(initialState);
  const handleImageChange = (e) => {
    setImage((prev) => ({
      ...prev,
      imageFile: e.target.value,
    }));
    console.log(e.target.files);
  };

  return (
    <div>
      <span>Upload You Album</span>

      <form className="upload_Form">
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
            <input type="file" name="audio-files" id="audio-files" />
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
