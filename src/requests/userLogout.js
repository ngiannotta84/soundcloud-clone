import Cookie from "js-cookie";

const userLogout = () => {
  Cookie.remove("userToken");
};

export default userLogout;
