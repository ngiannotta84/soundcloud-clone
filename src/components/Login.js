import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";
import userLogin from "../requests/userLogin";

const Login = () => {
  const initialState = {
    fields: {
      email: "",
      password: "",
    },
    alert: "",
  };
  const [fields, setFields] = useState(initialState.fields);
  const [alert, setAlert] = useState(initialState.alert);

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
    } else if (fields.password.length < 8) {
      setAlert("password must be atleast 8 characters long");
    } else {
      try {
        await userLogin(fields);
        setAlert("");
      } catch (err) {
        setAlert("Server Issue, please try again later");
      }
    }
  };

  return (
    <div className="login">
      <span>Please Login</span>
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
              type="text"
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
      <span> Not Registered? </span>
      <Link className="navbar-links-item" to="/signup">
        Sign-Up Here
      </Link>
    </div>
  );
};

export default Login;
