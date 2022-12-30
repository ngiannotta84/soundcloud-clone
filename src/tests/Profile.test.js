import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import Profile from "../components/Profile";
import * as getUsers from "../requests/getUsers";
import fakeUserData from "./testData/fakeUserData";

describe("Profile", () => {
  const validProps = {
    handleSetPlaylist: jest.fn(),
  };

  describe("snapshots", () => {
    test("snapshot with user data", async () => {
      jest.spyOn(getUsers, "default").mockResolvedValue(fakeUserData);

      let asFragment;
      await act(() => {
        const view = render(
          <Router>
            <Profile handleSetPlaylist={validProps.handleSetPlaylist} />
          </Router>
        );
        asFragment = view.asFragment;
      });

      expect(asFragment()).toMatchSnapshot();
    });

    test("snapshot no user data", async () => {
      jest.spyOn(getUsers, "default").mockResolvedValue([]);

      let asFragment;
      await act(() => {
        const view = render(
          <Router>
            <Profile handleSetPlaylist={validProps.handleSetPlaylist} />
          </Router>
        );
        asFragment = view.asFragment;
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("with user data", () => {
    beforeEach(async () => {
      jest.spyOn(getUsers, "default").mockResolvedValue(fakeUserData);

      await act(() => {
        render(
          <Router>
            <Profile handleSetPlaylist={validProps.handleSetPlaylist} />
          </Router>
        );
      });
    });

    test("renders correctly", async () => {
      await waitFor(() => {
        const images = screen.getAllByRole("img");

        expect(screen.getByTestId("profile-name")).toHaveTextContent(
          fakeUserData[0].name
        );
        expect(images).toHaveLength(fakeUserData[0].Albums.length);
        expect(images[0]).toHaveAttribute(
          "alt",
          `${fakeUserData[0].Albums[0].name} cover art`
        );
      });
    });
  });

  describe("with no user data", () => {
    beforeEach(async () => {
      jest.spyOn(getUsers, "default").mockResolvedValue([]);

      await act(() => {
        render(
          <Router>
            <Profile handleSetPlaylist={validProps.handleSetPlaylist} />
          </Router>
        );
      });
    });

    test("renders correctly", async () => {
      await waitFor(() => {
        expect(screen.getByText(/no user found/i)).toBeInstanceOf(
          HTMLHeadingElement
        );
      });
    });
  });
});
