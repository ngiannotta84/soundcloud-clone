import { postRequest } from "./helpers";

const userSignup = async (data) => {
  try {
    const response = await postRequest("users/signup", data);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default userSignup;
