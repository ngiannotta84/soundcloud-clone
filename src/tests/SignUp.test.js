import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../components/SignUp";
import * as userSignup from "../requests/userSignup";

describe("Login", () => {
  const validProps = {
    handleLogin: jest.fn(),
  };
  const userSignupMock = jest.spyOn(userSignup, "default");

  test("snapshot", () => {
    const { asFragment } = render(
      <Router>
        <SignUp handleLogin={validProps.handleLogin} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(
        <Router>
          <SignUp handleLogin={validProps.handleLogin} />
        </Router>
      );
    });

    test("renders correctly", () => {
      expect(screen.getByText(/please signup/i)).toBeInstanceOf(
        HTMLHeadingElement
      );
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByText(/submit/i)).toBeInstanceOf(HTMLButtonElement);
      expect(screen.getByText(/already have an account?/i)).toBeInTheDocument();
      expect(screen.getByText(/log in Here/i)).toBeInTheDocument();
    });

    test("it renders an error message if no username is entered", () => {
      const button = screen.getByText(/submit/i);
      fireEvent.click(button);

      expect(
        screen.getByText(/please provide a username/i)
      ).toBeInTheDocument();
    });

    test("it renders an error message if no email is entered", () => {
      const username = screen.getByLabelText(/username/i);
      const button = screen.getByText(/submit/i);

      fireEvent.change(username, { target: { value: "name" } });
      fireEvent.click(button);

      expect(
        screen.getByText(/please provide your email address here/i)
      ).toBeInTheDocument();
    });

    test("it renders an error message if no password is entered", () => {
      const username = screen.getByLabelText(/username/i);
      const email = screen.getByLabelText(/email/i);
      const button = screen.getByText(/submit/i);

      fireEvent.change(username, { target: { value: "name" } });
      fireEvent.change(email, { target: { value: "me@gmail.com" } });
      fireEvent.click(button);

      expect(
        screen.getByText(/please insert your password here/i)
      ).toBeInTheDocument();
    });

    test("it renders an error message if the password is less than 8 characters long", () => {
      const username = screen.getByLabelText(/username/i);
      const email = screen.getByLabelText(/email/i);
      const password = screen.getByLabelText(/^password$/i);
      const button = screen.getByText(/submit/i);

      fireEvent.change(username, { target: { value: "name" } });
      fireEvent.change(email, { target: { value: "megmail.com" } });
      fireEvent.change(password, { target: { value: "1234567" } });
      fireEvent.click(button);

      expect(
        screen.getByText(/password must be atleast 8 characters long/i)
      ).toBeInTheDocument();
    });

    test("it renders an error message if the passwords don't match", () => {
      const username = screen.getByLabelText(/username/i);
      const email = screen.getByLabelText(/email/i);
      const password = screen.getByLabelText(/^password$/i);
      const confirmPassword = screen.getByLabelText(/confirm password/i);
      const button = screen.getByText(/submit/i);

      fireEvent.change(username, { target: { value: "name" } });
      fireEvent.change(email, { target: { value: "megmail.com" } });
      fireEvent.change(password, { target: { value: "12345678" } });
      fireEvent.change(confirmPassword, { target: { value: "12345Nicola" } });
      fireEvent.click(button);

      expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
    });

    test("it renders an error message if incorrect type of email is entered", () => {
      const username = screen.getByLabelText(/username/i);
      const email = screen.getByLabelText(/email/i);
      const password = screen.getByLabelText(/^password$/i);
      const confirmPassword = screen.getByLabelText(/confirm password/i);
      const button = screen.getByText(/submit/i);

      fireEvent.change(username, { target: { value: "name" } });
      fireEvent.change(email, { target: { value: "megmail.com" } });
      fireEvent.change(password, { target: { value: "12345Nicola" } });
      fireEvent.change(confirmPassword, { target: { value: "12345Nicola" } });
      fireEvent.click(button);

      expect(
        screen.getByText(/please provide a valid email/i)
      ).toBeInTheDocument();
    });

    test("it renders and error message if userSignup throws an error", () => {
      const error = "Error!";
      userSignupMock.mockImplementation(() => {
        throw new Error(error);
      });
      const username = screen.getByLabelText(/username/i);
      const email = screen.getByLabelText(/email/i);
      const password = screen.getByLabelText(/^password$/i);
      const confirmPassword = screen.getByLabelText(/confirm password/i);
      const button = screen.getByText(/submit/i);

      fireEvent.change(username, { target: { value: "name" } });
      fireEvent.change(email, { target: { value: "valid@email.com" } });
      fireEvent.change(password, { target: { value: "12345Nicola" } });
      fireEvent.change(confirmPassword, { target: { value: "12345Nicola" } });
      fireEvent.click(button);

      expect(screen.getByText(error)).toBeInTheDocument();
    });

    test("user is logged-in if userSignup is succesfull", async () => {
      const fakeResolve = {
        name: "fakeName",
        id: "fakeId",
      };
      userSignupMock.mockResolvedValue(fakeResolve);

      const username = screen.getByLabelText(/username/i);
      const email = screen.getByLabelText(/email/i);
      const password = screen.getByLabelText(/^password$/i);
      const confirmPassword = screen.getByLabelText(/confirm password/i);
      const button = screen.getByText(/submit/i);

      fireEvent.change(username, { target: { value: "name" } });
      fireEvent.change(email, { target: { value: "valid@email.com" } });
      fireEvent.change(password, { target: { value: "12345Nicola" } });
      fireEvent.change(confirmPassword, { target: { value: "12345Nicola" } });
      fireEvent.click(button);

      await waitFor(() => {
        expect(validProps.handleLogin).toBeCalledWith(fakeResolve);
      });
    });
  });
});
