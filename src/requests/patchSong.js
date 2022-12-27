/* eslint-disable no-console */
import instance from "./instance";

const patchSong = async (id, data) => {
  const formData = new FormData();
  if (data.name) {
    formData.append("name", data.name);
  }
  if (data.audio) {
    formData.append("audio", data.audio);
  }
  if (data.position) {
    formData.append("position", data.position);
  }
  if (data.AlbumId) {
    formData.append("AlbumId", data.AlbumId);
  }

  try {
    const response = await instance.patch(`/songs/${id}`, formData);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default patchSong;
