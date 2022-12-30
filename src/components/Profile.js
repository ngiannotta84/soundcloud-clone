import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import getUsers from "../requests/getUsers";
import Album from "./Album";
import deleteUser from "../requests/deleteUser";
import Alert from "./Alert";
import userLogout from "../requests/userLogout";

const Profile = ({ handleSetPlaylist, userId, handleLogout }) => {
  const initialState = {
    profile: {
      name: "no user found",
    },
  };
  const { userName } = useParams();
  const [profile, setProfile] = useState(initialState.profile);
  const [alert, setAlert] = useState("");
  const [confirm, setConfirm] = useState(false);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const [response] = await getUsers({ name: userName, exact: true });
        if (response) {
          setProfile(response);
        } else {
          setProfile(initialState.profile);
        }
      } catch (err) {
        setProfile(initialState.profile);
      }
    })();
  }, [userName]);

  const deleteProfile = async () => {
    const password = passwordRef.current.value;

    try {
      await deleteUser(userId, password);
      await userLogout();
      handleLogout();
      navigate("/");
    } catch (err) {
      setAlert(err.message);
    }
  };

  return (
    <div>
      <Alert message={alert} />
      <h2 data-testid="profile-name">{profile.name}</h2>
      {profile.id === userId && (
        <button type="button" onClick={() => setConfirm(true)}>
          Delete Profile
        </button>
      )}
      {confirm && (
        <div>
          <input type="text" ref={passwordRef} />
          <button type="button" onClick={deleteProfile}>
            Confirm
          </button>
          <button type="button" onClick={() => setConfirm(false)}>
            Cancel
          </button>
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
