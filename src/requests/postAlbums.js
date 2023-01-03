import { postRequest } from "./helpers";

const postAlbums = async (data) => {
  if (!data.name) {
    throw new Error("missing data");
  }

  const response = await postRequest("albums", data);
  return response;
};

export default postAlbums;
