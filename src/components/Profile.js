import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import getUsers from "../requests/getUsers";
import Album from "./Album";

const Profile = ({ handleSetPlaylist }) => {
  const initialState = {
    profile: {
      name: "no user found",
    },
  };
  const { userName } = useParams();
  const [profile, setProfile] = useState(initialState.profile);

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

  return (
    <div>
      <h2 data-testid="profile-name">{profile.name}</h2>
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
            />
          );
        })}
    </div>
  );
};

Profile.propTypes = {
  handleSetPlaylist: PropTypes.func.isRequired,
};

export default Profile;
