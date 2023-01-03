import { deleteRequest } from "./helpers";

const deleteAlbum = async (id) => {
  const response = await deleteRequest("albums", id);
  return response;
};

export default deleteAlbum;
