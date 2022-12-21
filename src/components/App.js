import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import Upload from "./Upload";
import Profile from "./Profile";
import SignUp from "./SignUp";

const App = () => {
  const [user, setUser] = useState({
    name: null,
    id: null,
  });

  const handleLogin = (data) => {
    setUser({
      name: data.name,
      id: data.id,
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
    <div className="App">
      <Router>
        <Navbar userName={user.name} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile/:userName" element={<Profile />} />
          <Route
            path="/signup"
            element={<SignUp handleLogin={handleLogin} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
