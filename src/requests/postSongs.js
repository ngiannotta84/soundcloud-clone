import { postRequest } from "./helpers";

const postSongs = async (data) => {
  if (
    !data.name ||
    !data.AlbumId ||
    data.position === undefined ||
    !data.audio
  ) {
    throw new Error("missing data");
  }

  const response = await postRequest("songs", data);
  return response;
};

export default postSongs;
