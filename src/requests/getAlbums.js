/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const getAlbums = async ({ name, exact, limit }) => {
  let endpoint = `${address}/albums`;
  const queryArray = [];
  if (name) {
    queryArray.push(`name=${name}`);
    if (exact) {
      queryArray.push("exact=true");
    }
  }
  if (limit) {
    queryArray.push(`limit=${limit}`);
  }
  if (queryArray.length > 0) {
    const query = queryArray.join("&");
    endpoint = `${endpoint}?${query}`;
  }
  console.log(endpoint);
  try {
    const response = await axios.get(endpoint);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default getAlbums;
