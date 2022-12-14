import React, { useState } from "react";
import sendData from "../request/request";

const Login = () => {
  const initialState = {
    fields: {
      email: "",
      password: "",
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
