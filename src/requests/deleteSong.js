import { deleteRequest } from "./helpers";

const deleteSong = async (id) => {
  try {
    const response = await deleteRequest("songs", id);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default deleteSong;
