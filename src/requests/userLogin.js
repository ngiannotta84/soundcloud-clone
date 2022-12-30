import Cookies from "js-cookie";
import { postRequest } from "./helpers";

const userLogin = async (data) => {
  try {
    const response = await postRequest("users/login", data);
    Cookies.set("userToken", response.userToken, { expires: 1 });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default userLogin;
