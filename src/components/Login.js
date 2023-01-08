import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Alert from "./Alert";
import userLogin from "../requests/userLogin";
import "../styles/login.css";

const Login = ({ handleLogin }) => {
  const initialState = {
    fields: {
      email: "",
      password: "",
    },
    alert: "",
  };
  const [fields, setFields] = useState(initialState.fields);
  const [alert, setAlert] = useState(initialState.alert);
  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleCredentials = async (event) => {
    const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    event.preventDefault();
    if (!fields.email) {
      setAlert("please provide your email address");
    } else if (!fields.password) {
      setAlert("please insert your password");
    } else if (!fields.email.match(EMAIL_REGEX)) {
      setAlert("please provide a valid email");
    } else {
      try {
        const response = await userLogin(fields);
        handleLogin(response);
        navigate(`/profile/${response.name}`);
      } catch (err) {
        setAlert(err.message);
      }
    }
  };

  return (
    <div className="login">
      <Alert message={alert} />
      <form onSubmit={handleCredentials} className="login__form">
        <h2 className="login__heading">Please Login</h2>
        <label htmlFor="email" className="login__label">
          <span className="login__label-text">Email</span>
          <input
            type="text"
            id="email"
            name="email"
            value={fields.email}
            onChange={handleFieldChange}
            className="login__input"
          />
        </label>
        <label htmlFor="password" className="login__label">
          <span className="login__label-text">Password</span>
          <input
            type="password"
            id="password"
            name="password"
            value={fields.password}
            onChange={handleFieldChange}
            className="login__input"
          />
        </label>
        <button className="login__button" type="submit">
          Login
        </button>
      </form>
      <p className="login__signup">
        Not Registered?
        <Link to="/signup" className="login__signup__link">
          Sign-Up Here
        </Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
