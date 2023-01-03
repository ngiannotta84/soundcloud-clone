import { patchRequest } from "./helpers";

const patchSong = async (id, data) => {
  const response = await patchRequest("songs", id, data);
  return response;
};

export default patchSong;
