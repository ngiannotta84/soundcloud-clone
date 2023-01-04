import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Album from "./Album";
import Song from "./Song";
import Artist from "./Artist";
import getAlbums from "../requests/getAlbums";
import getSongs from "../requests/getSongs";
import getUsers from "../requests/getUsers";

const Search = ({ handleSetPlaylist }) => {
  const { name } = useParams();
  const [search, setSearch] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const albumResponse = await getAlbums({ name });
        const songResponse = await getSongs({ name });
        const artistResponse = await getUsers({ name });
        const data = [...albumResponse, ...songResponse, ...artistResponse];
        data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        setSearch(data);
      } catch (err) {
        setSearch([]);
      }
    })();
  }, [name]);

  return (
    <div className="feed">
      {search.length > 0 ? (
        search.map((data) => {
          if (data.AlbumId) {
            return (
              <Song
                artistName={data.Album.User.name}
                albumName={data.Album.name}
                albumArt={data.Album.url}
                songName={data.name}
                songAudio={data.url}
                handleSetPlaylist={handleSetPlaylist}
                key={`${data.id}${data.name}`}
              />
            );
          }
          if (data.UserId) {
            return (
              <Album
                artistName={data.User.name}
                albumName={data.name}
                albumArt={data.url}
                songs={data.Songs}
                handleSetPlaylist={handleSetPlaylist}
                key={`${data.id}${data.name}`}
                albumId={data.id}
              />
            );
          }
          if (data.email) {
            return (
              <Artist
                name={data.name}
                image={data.Albums[0]?.url}
                key={`${data.id}${data.name}`}
              />
            );
          }
          return null;
        })
      ) : (
        <h2>No results</h2>
      )}
    </div>
  );
};

Search.propTypes = {
  handleSetPlaylist: PropTypes.func.isRequired,
};

export default Search;
