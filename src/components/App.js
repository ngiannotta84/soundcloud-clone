import React from "react";
import "../styles/App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import Upload from "./Upload";
import Profile from "./Profile";

const App = () => {
  return (
    <div className="App">
      <h2>SoundClone</h2>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="search" element={<Search />} />
        <Route path="upload" element={<Upload />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
