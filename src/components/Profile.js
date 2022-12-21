import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import getUsers from "../requests/getUsers";
import Album from "./Album";

const Profile = ({ handleSetPlaylist }) => {
  const { userName } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await getUsers({ name: userName, exact: true });
        setUser(response[0]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <h2>{user.name}</h2>
      {user.Albums &&
        user.Albums.map((album) => {
          return (
            <Album
              artistName={user.name}
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
