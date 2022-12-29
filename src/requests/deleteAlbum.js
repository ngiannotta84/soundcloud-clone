import { deleteRequest } from "./helpers";

const deleteAlbum = async (id) => {
  try {
    const response = await deleteRequest("albums", id);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default deleteAlbum;
