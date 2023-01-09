import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Alert from "./Alert";
import Loader from "./Loader";
import Confirm from "./Confirm";
import ConfirmPassword from "./ConfirmPassword";
import getUserById from "../requests/getUserById";
import deleteUser from "../requests/deleteUser";
import userLogout from "../requests/userLogout";
import patchUser from "../requests/patchUser";

const EditProfile = ({ user, handleLogin }) => {
  const [placeholders, setPlaceholders] = useState({});
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();

  const handleUserData = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const saveChanges = async () => {
    const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    setLoading(true);
    setAlert("");
    try {
      if (userData.email && !userData.email.match(EMAIL_REGEX)) {
        setAlert("Email must be valid");
      } else if (
        userData.password &&
        userData.password !== userData.confirmPassword
      ) {
        setAlert("Password do not match");
      } else if (userData.password && userData.password.length < 8) {
        setAlert("Password must be atleast 8 characters long");
      } else {
        const data = {
          name: userData.name || undefined,
          email: userData.email || undefined,
          password: userData.password || undefined,
        };
        await patchUser(user.id, data);

        if (userData.name) {
          handleLogin({ name: userData.name });
        }

        navigate(`/profile/${userData.name || user.name}`);
      }
    } catch (err) {
      setAlert(err.message);
    } finally {
      setLoading(false);
      setConfirm(null);
    }
  };

  const deleteProfile = async (password) => {
    setLoading(true);
    setAlert("");

    try {
      await deleteUser(user.id, password);
      await userLogout();
      handleLogin();
      navigate("/");
    } catch (err) {
      setAlert(err.message);
    } finally {
      setLoading(false);
      setConfirm(null);
    }
  };

  useEffect(() => {
    (async () => {
      if (!user.id) return;
      const response = await getUserById(user.id);
      setPlaceholders(response);
    })();
  }, [user.id]);

  return (
    <div className="upload">
      <Loader loading={loading} />
      <Alert message={alert} />
      <form className="upload__form">
        <h2 className="upload__title">Update Profile</h2>
        <label htmlFor="name" className="upload__label">
          <span className="upload-info">New Name</span>
          <input
            id="name"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleUserData}
            placeholder={placeholders.name}
          />
        </label>
        <label htmlFor="email" className="upload__label">
          <span className="upload-info">New Email</span>
          <input
            id="email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleUserData}
            placeholder={placeholders.email}
          />
        </label>
        <label htmlFor="newPassword" className="upload__label">
          <span className="upload-info">New Password</span>
          <input
            id="newPassword"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleUserData}
          />
        </label>
        <label htmlFor="confirmNewPassword" className="upload__label">
          <span className="upload-info">Confirm New Password</span>
          <input
            id="confirmNewPassword"
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleUserData}
          />
        </label>
        <div className="upload__button-container">
          <button
            type="button"
            className="cancel-button"
            onClick={() => setConfirm("cancel")}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setConfirm("delete")}
            className="delete-button"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => setConfirm("save")}
            className="save-button"
          >
            Save Changes
          </button>
        </div>
      </form>
      {confirm === "save" && (
        <Confirm callback={saveChanges} setConfirm={setConfirm} />
      )}
      {confirm === "delete" && (
        <ConfirmPassword callback={deleteProfile} setConfirm={setConfirm} />
      )}
      {confirm === "cancel" && (
        <Confirm callback={handleCancel} setConfirm={setConfirm} />
      )}
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default EditProfile;
