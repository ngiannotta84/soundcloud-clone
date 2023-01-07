import { deleteRequest } from "./helpers";

const deleteSong = async (id) => {
  const response = await deleteRequest("songs", id);
  return response;
};

export default deleteSong;
