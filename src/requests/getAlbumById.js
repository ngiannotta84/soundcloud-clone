/* eslint-disable no-console */
import instance from "./instance";

const getAlbumById = async (id) => {
  try {
    const response = await instance.get(`/albums/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default getAlbumById;
