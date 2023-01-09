import axios from "axios";

const address = "https://soundcloud-clone-api.onrender.com";

const instance = axios.create({
  withCredentials: true,
  baseURL: address,
});

export default instance;
