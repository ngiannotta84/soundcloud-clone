import { postRequest } from "./helpers";

const userLogin = async (data) => {
  try {
    const response = await postRequest("users/login", data);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default userLogin;
