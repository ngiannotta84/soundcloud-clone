import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import getUsers from "../requests/getUsers";
import Album from "./Album";
import deleteUser from "../requests/deleteUser";
import Alert from "./Alert";
import Loader from "./Loader";
import userLogout from "../requests/userLogout";
import "../styles/profile.css";

const Profile = ({ handleSetPlaylist, userId, handleLogout }) => {
  const [profile, setProfile] = useState({});
  const [alert, setAlert] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef(null);
  const { userName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [response] = await getUsers({ name: userName, exact: true });
        if (response) {
          setProfile(response);
        } else {
          setProfile({});
        }
      } catch (err) {
        setProfile({});
      } finally {
        setLoading(false);
      }
    })();
  }, [userName]);

  const deleteProfile = async () => {
    const password = passwordRef.current.value;

    try {
      setLoading(true);
      await deleteUser(userId, password);
      await userLogout();
      handleLogout();
      navigate("/");
    } catch (err) {
      setAlert(err.message);
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  return (
    <div className="feed">
      <Loader loading={loading} />
      <Alert message={alert} />
      {!loading && !profile.name ? (
        <h2>No User Found</h2>
      ) : (
        <div className="profile__header">
          <h2 data-testid="profile-name" className="profile__header__heading">
            {profile.name}
          </h2>
          {profile.id === userId && (
            <button
              type="button"
              onClick={() => setConfirm(true)}
              className="profile__delete-button"
            >
              Delete Profile
            </button>
          )}
        </div>
      )}
      {confirm && (
        <div className="profile__confirm-password--container">
          <div className="profile__confirm-password">
            <label
              htmlFor="confirm-password"
              className="profile__confirm-password__label"
            >
              <span className="profile__confirm-password__label-text">
                Confirm Password
              </span>
              <input type="password" ref={passwordRef} id="confirm-password" />
            </label>
            <button
              type="button"
              onClick={deleteProfile}
              className="profile__confirm-password__confirm"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirm(false)}
              className="profile__confirm-password__cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {profile.Albums &&
        profile.Albums.map((album) => {
          return (
            <Album
              artistName={profile.name}
              albumName={album.name}
              albumArt={album.url}
              songs={album.Songs}
              key={album.id}
              handleSetPlaylist={handleSetPlaylist}
              albumId={album.id}
              userId={userId}
              albumUserId={profile.id}
            />
          );
        })}
    </div>
  );
};

Profile.defaultProps = {
  userId: null,
};

Profile.propTypes = {
  handleSetPlaylist: PropTypes.func.isRequired,
  userId: PropTypes.number,
  handleLogout: PropTypes.func.isRequired,
};

export default Profile;
