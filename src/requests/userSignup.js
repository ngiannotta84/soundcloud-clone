import Cookies from "js-cookie";
import { postRequest } from "./helpers";

const userSignup = async (data) => {
  try {
    const response = await postRequest("users/signup", data);
    Cookies.set("userToken", response.userToken, { expires: 1 });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default userSignup;
