/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const postAlbums = async (data) => {
  if (!data.name) {
    throw new Error("missing data");
  }
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.image) {
    formData.append("image", data.image);
  }

  try {
    const response = await axios.post(`${address}/songs`, formData);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export default postAlbums;
