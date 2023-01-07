import Cookies from "js-cookie";
import { postRequest } from "./helpers";

const userSignup = async (data) => {
  const response = await postRequest("users/signup", data);
  Cookies.set("userToken", response.userToken, { expires: 1 });
  return response;
};

export default userSignup;
