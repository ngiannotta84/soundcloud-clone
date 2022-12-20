/* eslint-disable no-console */
import axios from "axios";
import address from "./address";

const getUsers = async (name, exact) => {
  try {
    const response = await axios.get();
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export default getUsers;
