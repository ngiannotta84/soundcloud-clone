import { React, useState } from "react";
import sendData from "../request/request";

const SignUp = () => {
  const initialState = {
    fields: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  };
  const [fields, setFields] = useState(initialState.fields);
  const handleFieldChange = (e) => {
    setFields({ [e.target.name]: e.target.value });
  };
  const handleCredentials = (event) => {
    event.preventDefaul();
    sendData(fields);
  };
  return (
    <div className="login">
      <p>Please Login</p>
      <form onSubmit={handleCredentials}>
        <div className="form-field">
          <label htmlFor="username">
            <span>UserName</span>
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
        <div className="form-field">
          <label htmlFor="password-confirmation">
            <span>confirm-password</span>
            <input
              type="text"
              id="password-confirmation"
              name="password-confirmation"
              value={fields.password}
              onChange={handleFieldChange}
            />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
