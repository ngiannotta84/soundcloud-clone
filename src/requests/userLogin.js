/* eslint-disable no-console */
import instance from "./instance";

const userLogin = async (data) => {
  try {
    const response = await instance.post(`/users/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default userLogin;
