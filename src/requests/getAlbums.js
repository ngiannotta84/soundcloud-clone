/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const userSignup = async (data) => {
  try {
    const response = await axios.post(`${address}/users/signup`, data);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export default userSignup;
