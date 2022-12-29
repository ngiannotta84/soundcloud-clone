import { postRequest } from "./helpers";

const postSongs = async (data) => {
  if (!data.name || !data.AlbumId || !data.position || !data.audio) {
    throw new Error("missing data");
  }

  try {
    const response = await postRequest("songs", data);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default postSongs;
