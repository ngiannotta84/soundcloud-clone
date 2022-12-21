import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Album from "./Album";
import getAlbums from "../requests/getAlbums";

const Search = ({ handleSetPlaylist }) => {
  const { name } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAlbums({ name });
        setAlbums(response);
      } catch (err) {
        setAlbums([]);
      }
    })();
  }, [name]);

  return (
    <div>
      {albums.map((album) => {
        return (
          <Album
            artistName={album.User.name}
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

Search.propTypes = {
  handleSetPlaylist: PropTypes.func.isRequired,
};

export default Search;
