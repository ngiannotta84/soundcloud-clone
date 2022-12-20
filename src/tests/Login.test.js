import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../components/Login";

describe("describe login", () => {
  test("renders title", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const linkElement = screen.getByText(/please login/i);

    expect(linkElement).toBeInTheDocument();
  });

  test("it renders a button", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const button = screen.getByText("Submit");

    expect(button).toHaveClass("submit-button");
  });

  test("it renders an error message if no email is entered", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const button = screen.getByText("Submit");
    fireEvent.click(button);
    const message = screen.getByText("please provide your email address here");

    expect(message).toBeInTheDocument();
  });

  test("it renders an error message if no password is entered", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const button = screen.getByText("Submit");
    const eMail = screen.getByLabelText("email");

    fireEvent.change(eMail, { target: { value: "me@gmail.com" } });
    fireEvent.click(button);
    const message = screen.getByText("please insert your password here");

    expect(message).toBeInTheDocument();
  });
  test("it renders an error message if incorrect type of email is entered", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const button = screen.getByText("Submit");
    const eMail = screen.getByLabelText("email");
    const password = screen.getByLabelText("password");

    fireEvent.change(eMail, { target: { value: "megmail.com" } });
    fireEvent.change(password, { target: { value: "12345Nicola" } });
    fireEvent.click(button);
    const message = screen.getByText("please provide a valid email");

    expect(message).toBeInTheDocument();
  });
});
