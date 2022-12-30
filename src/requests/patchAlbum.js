import { patchRequest } from "./helpers";

const patchAlbum = async (id, data) => {
  try {
    const response = await patchRequest("albums", id, data);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default patchAlbum;
