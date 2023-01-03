import { React, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./Alert";
import userSignup from "../requests/userSignup";

const SignUp = ({ handleLogin }) => {
  const initialState = {
    fields: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
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
    if (!fields.username) {
      setAlert("please provide a username");
    } else if (!fields.email) {
      setAlert("please provide your email address here");
    } else if (!fields.password) {
      setAlert("please insert your password here");
    } else if (fields.password.length < 8) {
      setAlert("password must be atleast 8 characters long");
    } else if (fields.passwordConfirmation !== fields.password) {
      setAlert("passwords must match");
    } else if (!fields.email.match(EMAIL_REGEX)) {
      setAlert("please provide a valid email");
    } else {
      try {
        const response = await userSignup({
          name: fields.username,
          email: fields.email,
          password: fields.password,
        });
        handleLogin(response);
        navigate(`/profile/${response.name}`);
      } catch (err) {
        setAlert(err.message);
      }
    }
  };

  return (
    <div className="login">
      <h2>Please Signup</h2>
      <Alert message={alert} />
      <form onSubmit={handleCredentials}>
        <div className="form-field">
          <label htmlFor="username">
            <span>username</span>
            <input
              type="text"
              id="username"
              name="username"
              value={fields.username}
              onChange={handleFieldChange}
            />
          </label>
        </div>
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
            <span>Password</span>
            <input
              type="password"
              id="password"
              name="password"
              value={fields.password}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div className="form-field">
          <label htmlFor="passwordConfirmation">
            <span>Confirm Password</span>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={fields.password_confirmation}
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
        Already have an account?
        <Link className="navbar-links-item" to="/login">
          Log in Here
        </Link>
      </p>
    </div>
  );
};

SignUp.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default SignUp;
