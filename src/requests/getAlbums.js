/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const getAlbums = async (id) => {
  let endpoint = `${address}/albums`;
  if (id) {
    endpoint = `${endpoint}/id`;
  }

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default getAlbums;
