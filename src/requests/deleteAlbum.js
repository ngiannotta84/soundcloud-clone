/* eslint-disable no-console */
import instance from "./instance";

const deleteAlbum = async (id) => {
  try {
    const response = await instance.delete(`/albums/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default deleteAlbum;
