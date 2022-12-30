import { getByIdRequest } from "./helpers";

const getAlbumById = async (id) => {
  try {
    const response = await getByIdRequest("albums", id);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default getAlbumById;
