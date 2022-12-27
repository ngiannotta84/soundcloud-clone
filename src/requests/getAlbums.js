/* eslint-disable no-console */
import instance from "./instance";

const getAlbums = async (obj) => {
  let endpoint = `/albums`;
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
    if (queryArray.length > 0) {
      const query = queryArray.join("&");
      endpoint = `${endpoint}?${query}`;
    }
  }

  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default getAlbums;
