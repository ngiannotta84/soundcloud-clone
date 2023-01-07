import { getRequest } from "./helpers";

const getAlbums = async (obj) => {
  const response = await getRequest("albums", obj);
  return response;
};

export default getAlbums;
