/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const getUsers = async ({ name, exact, limit }) => {
  let endpoint = `${address}/users`;
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

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default getUsers;
