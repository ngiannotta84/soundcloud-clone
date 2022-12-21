/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const postAlbums = async () => {
  const formData = new FormData();
  formData.append("name", "album");

  try {
    const response = await axios.post(`${address}/songs`, formData);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export default postAlbums;
