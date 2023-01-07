import { getByIdRequest } from "./helpers";

const getUserById = async (id) => {
  const response = await getByIdRequest("users", id);
  return response;
};

export default getUserById;
