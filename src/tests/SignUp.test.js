import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "../components/SignUp";

describe("describe login", () => {
  test("renders title", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    const linkElement = screen.getByText(/please login/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("it renders a button", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    const button = screen.getByText("Submit");
    expect(button).toHaveClass("submit-button");
  });
  test("it renders an error message if no email is entered", () => {
    render(
      <Router>
        <SignUp />
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
        <SignUp />
      </Router>
    );
    const button = screen.getByText("Submit");
    const eMail = screen.getByLabelText("email");
    fireEvent.change(eMail, { target: { value: "megmail.com" } });
    fireEvent.click(button);
    const message = screen.getByText("please insert your password here");
    expect(message).toBeInTheDocument();
  });
  test("it renders an error message if the matching password is not correct", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    const button = screen.getByText("Submit");
    const eMail = screen.getByLabelText("email");
    const password = screen.getByLabelText("Password");
    const password2 = screen.getByLabelText("Confirm Password");
    fireEvent.change(eMail, { target: { value: "megmail.com" } });
    fireEvent.change(password, { target: { value: "12345Nicola" } });
    fireEvent.change(password2, { target: { value: "1235Nicolas" } });
    fireEvent.click(button);
    const message = screen.getByText("please insert 2 matching passwords here");
    expect(message).toBeInTheDocument();
  });
  test("it renders an error message if incorrect type of email is entered", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    const button = screen.getByText("Submit");
    const eMail = screen.getByLabelText("email");
    const password = screen.getByLabelText("Password");
    const password2 = screen.getByLabelText("Confirm Password");
    fireEvent.change(eMail, { target: { value: "megmail.com" } });
    fireEvent.change(password, { target: { value: "12345Nicola" } });
    fireEvent.change(password2, { target: { value: "12345Nicola" } });
    fireEvent.click(button);
    const message = screen.getByText("please provide a valid email");
    expect(message).toBeInTheDocument();
  });
});
