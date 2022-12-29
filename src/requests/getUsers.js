import { getRequest } from "./helpers";

const getUsers = async (obj) => {
  try {
    const response = await getRequest("users", obj);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default getUsers;
