import { patchRequest } from "./helpers";

const patchAlbum = async (id, data) => {
  const response = await patchRequest("albums", id, data);
  return response;
};

export default patchAlbum;
