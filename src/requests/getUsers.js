/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const getUsers = async (obj) => {
  let endpoint = `${address}/users`;
  const queryArray = [];
  if (obj) {
    if (obj.name) {
      queryArray.push(`name=${obj.name}`);
      if (obj.exact) {
        queryArray.push("exact=true");
      }
    }
    if (obj.limit) {
      queryArray.push(`limit=${obj.limit}`);
    }
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
