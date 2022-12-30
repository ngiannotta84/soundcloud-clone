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

    test("renders links", () => {
      expect(screen.getByText(/soundclone/i)).toHaveAttribute("href", "/");
      expect(screen.getByText(/home/i)).toHaveAttribute("href", "/");
      expect(screen.getByText(/search/i)).toBeInstanceOf(HTMLButtonElement);
      expect(screen.getByText(/login/i)).toHaveAttribute("href", "/login");
    });

    test("search bar", () => {
      const searchInput = screen.getByRole("textbox");
      const searchButton = screen.getByText(/search/i);
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
      expect(screen.getByText(/soundclone/i)).toHaveAttribute("href", "/");
      expect(screen.getByText(/home/i)).toHaveAttribute("href", "/");
      expect(screen.getByText(/search/i)).toBeInstanceOf(HTMLButtonElement);
      expect(screen.getByText(/profile/i)).toHaveAttribute(
        "href",
        `/profile/${validProps.userName}`
      );
      expect(screen.getByText(/upload/i)).toHaveAttribute("href", "/upload");
      expect(screen.getByText(/logout/i)).toHaveAttribute("href", "/logout");
    });
  });
});
