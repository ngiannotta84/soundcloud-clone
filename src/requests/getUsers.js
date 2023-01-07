import { getRequest } from "./helpers";

const getUsers = async (obj) => {
  const response = await getRequest("users", obj);
  return response;
};

export default getUsers;
