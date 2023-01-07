import Cookies from "js-cookie";
import { postRequest } from "./helpers";

const userLogin = async (data) => {
  const response = await postRequest("users/login", data);
  Cookies.set("userToken", response.userToken, { expires: 1 });
  return response;
};

export default userLogin;
