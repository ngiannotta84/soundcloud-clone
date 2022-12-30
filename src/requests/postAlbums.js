import { postRequest } from "./helpers";

const postAlbums = async (data) => {
  if (!data.name) {
    throw new Error("missing data");
  }

  try {
    const response = await postRequest("albums", data);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default postAlbums;
