import { deleteRequest } from "./helpers";

const deleteUser = async (id, password) => {
  const endpoint = `${id}/${password}`;

  try {
    const response = await deleteRequest("users", endpoint);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default deleteUser;
