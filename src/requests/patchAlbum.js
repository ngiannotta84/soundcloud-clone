/* eslint-disable no-console */
import instance from "./instance";

const patchAlbum = async (id, data) => {
  const formData = new FormData();
  if (data.name) {
    formData.append("name", data.name);
  }
  if (data.image) {
    formData.append("image", data.image);
  }

  try {
    const response = await instance.patch(`/albums/${id}`, formData);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default patchAlbum;
