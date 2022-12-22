import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../components/Login";
import * as userLogin from "../requests/userLogin";

xdescribe("Login", () => {
  const validProps = {
    handleLogin: jest.fn(),
  };
  const userLoginMock = jest.spyOn(userLogin, "default");
  const mockNav = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNav,
  }));

  test("snapshot", () => {
    const { asFragment } = render(
      <Router>
        <Login handleLogin={validProps.handleLogin} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(
        <Router>
          <Login handleLogin={validProps.handleLogin} />
        </Router>
      );
    });

    test("renders title", () => {
      const linkElement = screen.getByText(/please login/i);

      expect(linkElement).toBeInTheDocument();
    });

    test("it renders a button", () => {
      const button = screen.getByText("Submit");

      expect(button).toHaveClass("submit-button");
    });

    test("it renders an error message if no email is entered", () => {
      const button = screen.getByText("Submit");
      fireEvent.click(button);
      const message = screen.getByText(
        "please provide your email address here"
      );

      expect(message).toBeInTheDocument();
    });

    test("it renders an error message if no password is entered", () => {
      const button = screen.getByText("Submit");
      const eMail = screen.getByLabelText("email");

      fireEvent.change(eMail, { target: { value: "me@gmail.com" } });
      fireEvent.click(button);
      const message = screen.getByText("please insert your password here");

      expect(message).toBeInTheDocument();
    });

    test("it renders an error message if incorrect type of email is entered", () => {
      const button = screen.getByText("Submit");
      const eMail = screen.getByLabelText("email");
      const password = screen.getByLabelText("password");

      fireEvent.change(eMail, { target: { value: "megmail.com" } });
      fireEvent.change(password, { target: { value: "12345Nicola" } });
      fireEvent.click(button);
      const message = screen.getByText("please provide a valid email");

      expect(message).toBeInTheDocument();
    });

    test("it renders and error message if userLogin throws an error", () => {
      userLoginMock.mockImplementation(() => {
        throw new Error();
      });
      const button = screen.getByText("Submit");
      const eMail = screen.getByLabelText("email");
      const password = screen.getByLabelText("password");

      fireEvent.change(eMail, { target: { value: "valid@email.com" } });
      fireEvent.change(password, { target: { value: "validPassword" } });
      fireEvent.click(button);

      expect(
        screen.getByText(
          "Login failed, please recheck your email and password and try again"
        )
      ).toBeInTheDocument();
    });

    test("user is logged in userLogin is succesfull", () => {
      const fakeResolve = {
        name: "fakeName",
        id: "fakeId",
      };
      userLoginMock.mockResolvedValue(fakeResolve);

      const button = screen.getByText("Submit");
      const eMail = screen.getByLabelText("email");
      const password = screen.getByLabelText("password");

      fireEvent.change(eMail, { target: { value: "valid@email.com" } });
      fireEvent.change(password, { target: { value: "validPassword" } });
      fireEvent.click(button);

      waitFor(() => {
        expect(validProps.handleLogin).toBeCalledWith(fakeResolve);
        expect(mockNav).toBeCalledWith(`/profile/${validProps.name}`);
      });
    });
  });
});
