import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/app.css";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import { v4 as uuid } from "uuid";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import Upload from "./Upload";
import Profile from "./Profile";
import SignUp from "./SignUp";
import MusicPlayer from "./MusicPlayer";
import Logout from "./Logout";
import Edit from "./Edit";

const App = () => {
  const initialState = {
    user: {
      name: null,
      id: null,
    },
  };
  const [playlist, setPlaylist] = useState([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [user, setUser] = useState(initialState.user);

  const handleLogin = (data) => {
    if (data === undefined) {
      setUser(initialState.user);
    } else {
      setUser({
        name: data.name,
        id: data.id,
      });
    }
  };

  const handleSetPlaylist = (song, addNext = false) => {
    const data = song;
    data.key = uuid();

    setPlaylist((prev) => {
      if (addNext) {
        const clone = [...prev];
        clone.splice(playlistIndex + 1, 0, data);
        return clone;
      }
      return [...prev, data];
    });
  };

  const removeFromPlaylist = (i) => {
    setPlaylist((prev) => {
      const clone = [...prev];
      clone.splice(i, 1);
      return clone;
    });

    setPlaylistIndex((prev) => {
      if (i >= prev || prev === 0) {
        return prev;
      }
      return prev - 1;
    });
  };

  useEffect(() => {
    const token = Cookie.get("userToken");
    if (token) {
      const currentUser = jwtDecode(token);
      handleLogin(currentUser);
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <Navbar userName={user.name} />
        <div className="app__routes">
          <Routes>
            <Route
              path="/"
              element={<Home handleSetPlaylist={handleSetPlaylist} />}
            />
            <Route
              path="/search/:name"
              element={<Search handleSetPlaylist={handleSetPlaylist} />}
            />
            <Route path="/upload" element={<Upload userName={user.name} />} />
            <Route
              path="/edit/:albumId"
              element={<Edit userName={user.name} />}
            />
            <Route
              path="/profile/:userName"
              element={
                <Profile
                  handleSetPlaylist={handleSetPlaylist}
                  userId={user.id}
                  handleLogout={handleLogin}
                />
              }
            />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={<SignUp handleLogin={handleLogin} />}
            />
            <Route
              path="/logout"
              element={<Logout handleLogout={handleLogin} />}
            />
          </Routes>
        </div>
      </Router>
      <MusicPlayer
        playlist={playlist}
        playlistIndex={playlistIndex}
        setPlaylistIndex={setPlaylistIndex}
        removeFromPlaylist={removeFromPlaylist}
      />
    </div>
  );
};

export default App;
