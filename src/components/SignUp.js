import { React, useState } from "react";
import Alert from "./Alert";

const SignUp = () => {
  const initialState = {
    fields: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    alert: {
      message: "",
    },
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
      setAlert({
        message: "please provide your email address here",
      });
    } else if (!fields.password) {
      setAlert({
        message: "please insert your password here",
      });
    } else if (!fields.password_confirmation) {
      setAlert({
        message: "please insert your password here",
      });
    } else if (fields.password_confirmation !== fields.password) {
      setAlert({
        message: "please insert 2 matching passwords here",
      });
    } else if (!fields.email.match(EMAIL_REGEX)) {
      setAlert({
        message: "please provide a valid email",
      });
    } else {
      try {
        setAlert({
          message: "",
        });
        setFields(initialState.fields);
      } catch ({ message }) {
        setAlert({
          message,
        });
      }
    }
  };

  return (
    <div className="login">
      <p>Please Login</p>
      <Alert message={alert.message} />
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
              type="text"
              id="password"
              name="password"
              value={fields.password}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div className="form-field">
          <label htmlFor="password_confirmation">
            <span>Confirm Password</span>
            <input
              type="text"
              id="password_confirmation"
              name="password_confirmation"
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
    </div>
  );
};

export default SignUp;
