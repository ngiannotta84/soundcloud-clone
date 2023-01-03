import { getByIdRequest } from "./helpers";

const getAlbumById = async (id) => {
  const response = await getByIdRequest("albums", id);
  return response;
};

export default getAlbumById;
