/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const postSongs = async (data) => {
  if (!data.name || !data.AlbumId || !data.position || !data.audio) {
    throw new Error("missing data");
  }
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("AlbumId", data.AlbumId);
  formData.append("position", data.position);
  formData.append("audio", data.audio);

  try {
    const response = await axios.post(`${address}/songs`, formData);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export default postSongs;