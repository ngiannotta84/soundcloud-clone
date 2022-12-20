import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import Upload from "./Upload";
import Profile from "./Profile";
import SignUp from "./SignUp";
import MusicPlayer from "./MusicPlayer";
import fakePlaylist from "../data/fakePlaylist";

const App = () => {
  const [playlist, setPlaylist] = useState(fakePlaylist);
  console.log(fakePlaylist);

  return (
    <div className="App">
      <h2>SoundClone</h2>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile/:userName" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <MusicPlayer playlist={playlist} />
      </Router>
    </div>
  );
};

export default App;
