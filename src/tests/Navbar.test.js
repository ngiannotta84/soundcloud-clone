import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  const validProps = {
    userName: "validName",
  };
  const mockNav = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNav,
  }));

  describe("snapshots", () => {
    test("userName is falsey snapshot", () => {
      const { asFragment } = render(
        <Router>
          <Navbar />
        </Router>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test("userName is truthy snapshot", () => {
      const { asFragment } = render(
        <Router>
          <Navbar userName={validProps.userName} />
        </Router>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("userName is falsey tests", () => {
    beforeEach(() => {
      render(
        <Router>
          <Navbar />
        </Router>
      );
    });

    test("renders correctly", () => {
      expect(screen.getByText(/soundclone/i).closest("a")).toHaveAttribute(
        "href",
        "/"
      );
      expect(screen.getByText(/home/i).closest("a")).toHaveAttribute(
        "href",
        "/"
      );
      expect(screen.getByText(/login/i).closest("a")).toHaveAttribute(
        "href",
        "/login"
      );
      expect(screen.getByAltText(/home/i)).toHaveAttribute("src", "home.png");
      expect(screen.getByAltText(/search/i)).toHaveAttribute(
        "src",
        "search.png"
      );
      expect(screen.getByAltText(/login/i)).toHaveAttribute("src", "login.png");
    });

    test("search bar", () => {
      const searchInput = screen.getByRole("textbox");
      const searchButton = screen.getByAltText(/search/i).closest("button");
      const searchText = "text";

      fireEvent.change(searchInput, { target: { value: searchText } });
      fireEvent.click(searchButton);

      waitFor(() => {
        expect(mockNav).toBeCalledWith(`search/${searchText}`);
      });
    });
  });

  describe("userName is truthy tests", () => {
    beforeEach(() => {
      render(
        <Router>
          <Navbar userName={validProps.userName} />
        </Router>
      );
    });

    test("renders links", () => {
      expect(screen.getByText(/soundclone/i).closest("a")).toHaveAttribute(
        "href",
        "/"
      );
      expect(screen.getByText(/home/i).closest("a")).toHaveAttribute(
        "href",
        "/"
      );
      expect(screen.getByText(/profile/i).closest("a")).toHaveAttribute(
        "href",
        `/profile/${validProps.userName}`
      );
      expect(screen.getByText(/upload/i).closest("a")).toHaveAttribute(
        "href",
        "/upload"
      );
      expect(screen.getByText(/logout/i).closest("a")).toHaveAttribute(
        "href",
        "/logout"
      );
      expect(screen.getByAltText(/home/i)).toHaveAttribute("src", "home.png");
      expect(screen.getByAltText(/search/i)).toHaveAttribute(
        "src",
        "search.png"
      );
      expect(screen.getByAltText(/profile/i)).toHaveAttribute(
        "src",
        "profile.png"
      );
      expect(screen.getByAltText(/upload/i)).toHaveAttribute(
        "src",
        "upload.png"
      );
      expect(screen.getByAltText(/logout/i)).toHaveAttribute(
        "src",
        "logout.png"
      );
    });
  });
});
