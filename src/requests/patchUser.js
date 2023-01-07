import { patchRequest } from "./helpers";

const patchUser = async (id, data) => {
  const response = await patchRequest("users", id, data);
  return response;
};

export default patchUser;
