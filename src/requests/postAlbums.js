/* eslint-disable no-console */
import instance from "./instance";

const postAlbums = async () => {
  const formData = new FormData();
  formData.append("name", "album");

  try {
    const response = await instance.post(`/songs`, formData);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export default postAlbums;
