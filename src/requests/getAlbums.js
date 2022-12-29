import { getRequest } from "./helpers";

const getAlbums = async (obj) => {
  try {
    const response = await getRequest("albums", obj);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default getAlbums;
