import React, { useEffect, useState } from "react";
import getAlbums from "../requests/getAlbums";
import Album from "./Album";

const Home = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAlbums();
        setAlbums(response);
      } catch (err) {
        console.error(err);
        setAlbums([]);
      }
    })();
  }, []);

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
          />
        );
      })}
    </div>
  );
};

export default Home;
