import { deleteRequest } from "./helpers";

const deleteUser = async (id, password) => {
  const endpoint = `${id}/${password}`;

  const response = await deleteRequest("users", endpoint);
  return response;
};

export default deleteUser;
