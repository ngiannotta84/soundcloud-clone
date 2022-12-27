/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const getAlbumById = async (id) => {
  try {
    const response = await axios.get(`${address}/albums/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default getAlbumById;
