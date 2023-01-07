import { getRequest } from "./helpers";

const getSongs = async (obj) => {
  const response = await getRequest("songs", obj);
  return response;
};

export default getSongs;
