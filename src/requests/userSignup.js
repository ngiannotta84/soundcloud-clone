/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const userSignup = async (data) => {
  try {
    const response = await axios.post(`${address}/users/signup`, data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default userSignup;
