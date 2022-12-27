/* eslint-disable no-console */
import instance from "./instance";

const userSignup = async (data) => {
  try {
    const response = await instance.post(`/users/signup`, data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default userSignup;
