import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Alert from "./Alert";
import userLogin from "../requests/userLogin";

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
      setAlert("please provide your email address here");
    } else if (!fields.password) {
      setAlert("please insert your password here");
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
      <h2>Please Login</h2>
      <Alert message={alert} />
      <form onSubmit={handleCredentials}>
        <div className="form-field">
          <label htmlFor="email">
            <span>email</span>
            <input
              type="text"
              id="email"
              name="email"
              value={fields.email}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div className="form-field">
          <label htmlFor="password">
            <span>password</span>
            <input
              type="password"
              id="password"
              name="password"
              value={fields.password}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
      <p>
        Not Registered?
        <Link className="navbar-links-item" to="/signup">
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
