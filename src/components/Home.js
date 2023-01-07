import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import getAlbums from "../requests/getAlbums";
import Album from "./Album";
import Loader from "./Loader";

const Home = ({ handleSetPlaylist }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getAlbums();
        setAlbums(response);
      } catch (err) {
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="feed">
      <Loader loading={loading} />
      {albums.map((album) => {
        return (
          <Album
            artistName={album.User.name}
            albumName={album.name}
            albumArt={album.url}
            songs={album.Songs}
            key={album.id}
            albumId={album.id}
            handleSetPlaylist={handleSetPlaylist}
          />
        );
      })}
    </div>
  );
};

Home.propTypes = {
  handleSetPlaylist: PropTypes.func.isRequired,
};

export default Home;
