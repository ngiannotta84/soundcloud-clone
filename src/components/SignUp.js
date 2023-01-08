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
      setAlert("please provide your email address");
    } else if (!fields.email.match(EMAIL_REGEX)) {
      setAlert("please provide a valid email");
    } else if (!fields.password) {
      setAlert("please insert your password");
    } else if (fields.password.length < 8) {
      setAlert("password must be atleast 8 characters long");
    } else if (fields.passwordConfirmation !== fields.password) {
      setAlert("passwords must match");
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
      <Alert message={alert} />
      <form onSubmit={handleCredentials} className="login__form">
        <h2 className="login__heading">Please Signup</h2>
        <label htmlFor="username" className="login__label">
          <span className="signup__label-text">Username</span>
          <input
            type="text"
            id="username"
            name="username"
            value={fields.username}
            onChange={handleFieldChange}
            className="login__input"
          />
        </label>
        <label htmlFor="email" className="login__label">
          <span className="signup__label-text">Email</span>
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
          <span className="signup__label-text">Password</span>
          <input
            type="password"
            id="password"
            name="password"
            value={fields.password}
            onChange={handleFieldChange}
            className="login__input"
          />
        </label>
        <label htmlFor="passwordConfirmation" className="login__label">
          <span className="signup__label-text">Confirm Password</span>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={fields.password_confirmation}
            onChange={handleFieldChange}
            className="login__input"
          />
        </label>
        <button className="login__button" type="submit">
          SignUp
        </button>
      </form>
      <p className="login__signup">
        Already have an account?
        <Link to="/login" className="login__signup__link">
          Log-in Here
        </Link>
      </p>
    </div>
  );
};

SignUp.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default SignUp;
