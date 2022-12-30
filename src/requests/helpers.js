/* eslint-disable no-console */
import Cookie from "js-cookie";
import instance from "./instance";

const createForm = (model, data) => {
  const formData = new FormData();
  switch (model) {
    case "songs": {
      if (data.name) {
        formData.append("name", data.name);
      }
      if (data.audio) {
        formData.append("audio", data.audio);
      }
      if (data.position !== undefined) {
        formData.append("position", data.position);
      }
      if (data.AlbumId) {
        formData.append("AlbumId", data.AlbumId);
      }
      break;
    }
    case "albums": {
      if (data.name) {
        formData.append("name", data.name);
      }
      if (data.image) {
        formData.append("image", data.image);
      }
      break;
    }
    default: {
      return data;
    }
  }
  return formData;
};

const config = () => {
  return {
    headers: {
      userToken: Cookie.get("userToken"),
    },
  };
};

const deleteRequest = async (model, id) => {
  try {
    const response = await instance.delete(`/${model}/${id}`, config());
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const getByIdRequest = async (model, id) => {
  try {
    const response = await instance.get(`/${model}/${id}`, config());
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const getRequest = async (model, obj) => {
  let endpoint = `/${model}`;
  const queryArray = [];
  if (obj) {
    if (obj.name) {
      queryArray.push(`name=${obj.name}`);
      if (obj.exact) {
        queryArray.push("exact=true");
      }
    }
    if (obj.limit) {
      queryArray.push(`limit=${obj.limit}`);
    }
    if (queryArray.length > 0) {
      const query = queryArray.join("&");
      endpoint = `${endpoint}?${query}`;
    }
  }

  try {
    const response = await instance.get(endpoint, config());
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const patchRequest = async (model, id, data) => {
  const formData = createForm(model, data);

  try {
    const response = await instance.patch(
      `/${model}/${id}`,
      formData,
      config()
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const postRequest = async (model, data) => {
  const formData = createForm(model, data);

  try {
    const response = await instance.post(`/${model}`, formData, config());
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export { deleteRequest, getByIdRequest, patchRequest, getRequest, postRequest };
