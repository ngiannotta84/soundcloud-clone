import { patchRequest } from "./helpers";

const patchSong = async (id, data) => {
  try {
    const response = await patchRequest("songs", id, data);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default patchSong;
