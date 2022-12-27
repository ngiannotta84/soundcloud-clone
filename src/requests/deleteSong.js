/* eslint-disable no-console */
import instance from "./instance";

const deleteSong = async (id) => {
  try {
    const response = await instance.delete(`/songs/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default deleteSong;
