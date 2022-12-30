import { getRequest } from "./helpers";

const getSongs = async (obj) => {
  try {
    const response = await getRequest("songs", obj);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default getSongs;
