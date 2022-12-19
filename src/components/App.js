import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import Upload from "./Upload";
import Profile from "./Profile";
import SignUp from "./SignUp";

const App = () => {
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
      </Router>
    </div>
  );
};

export default App;
