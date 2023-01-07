import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import getUsers from "../requests/getUsers";
import Album from "./Album";
import Loader from "./Loader";
import "../styles/profile.css";

const Profile = ({ handleSetPlaylist, userId }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const { userName } = useParams();

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

  return (
    <div className="feed">
      <Loader loading={loading} />
      {!loading && !profile.name ? (
        <h2>No User Found</h2>
      ) : (
        <div className="profile__header">
          <h2 data-testid="profile-name" className="profile__header__heading">
            {profile.name}
          </h2>
          {profile.id === userId && (
            <Link to="/profile/edit" className="profile__edit">
              Edit Profile
            </Link>
          )}
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
};

export default Profile;
