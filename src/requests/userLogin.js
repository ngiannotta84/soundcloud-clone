/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const userLogin = async (data) => {
  try {
    const response = await axios.post(`${address}/users/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default userLogin;
