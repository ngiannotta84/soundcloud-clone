import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import Search from "../components/Search";
import * as getAlbums from "../requests/getAlbums";
import * as getUsers from "../requests/getUsers";
import * as getSongs from "../requests/getSongs";
import fakeAlbumData from "./testData/fakeAlbumData";
import fakeUserData from "./testData/fakeUserData";
import fakeSongData from "./testData/fakeSongData";

const jestSpy = (func, data) => {
  jest.spyOn(func, "default").mockResolvedValue(data);
};

describe("Search", () => {
  const validProps = {
    handleSetPlaylist: jest.fn(),
  };

  describe("snapshots", () => {
    test("snapshot with user data", async () => {
      jestSpy(getAlbums, fakeAlbumData);
      jestSpy(getUsers, fakeUserData);
      jestSpy(getSongs, fakeSongData);

      let asFragment;
      await act(() => {
        const view = render(
          <Router>
            <Search handleSetPlaylist={validProps.handleSetPlaylist} />
          </Router>
        );
        asFragment = view.asFragment;
      });

      expect(asFragment()).toMatchSnapshot();
    });

    test("snapshot no user data", async () => {
      jestSpy(getAlbums, []);
      jestSpy(getUsers, []);
      jestSpy(getSongs, []);

      let asFragment;
      await act(() => {
        const view = render(
          <Search handleSetPlaylist={validProps.handleSetPlaylist} />
        );
        asFragment = view.asFragment;
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("with data", () => {
    beforeEach(async () => {
      jestSpy(getAlbums, fakeAlbumData);
      jestSpy(getUsers, fakeUserData);
      jestSpy(getSongs, fakeSongData);

      await act(() => {
        render(
          <Router>
            <Search handleSetPlaylist={validProps.handleSetPlaylist} />
          </Router>
        );
      });
    });

    test("renders correctly", async () => {
      await waitFor(() => {
        const images = screen.getAllByRole("img");

        expect(images).toHaveLength(
          fakeAlbumData.length + fakeSongData.length + fakeUserData.length
        );
      });
    });
  });

  describe("without data", () => {
    beforeEach(async () => {
      jestSpy(getAlbums, []);
      jestSpy(getUsers, []);
      jestSpy(getSongs, []);

      await act(() => {
        render(
          <Router>
            <Search handleSetPlaylist={validProps.handleSetPlaylist} />
          </Router>
        );
      });
    });

    test("renders correctly", async () => {
      await waitFor(() => {
        expect(screen.getByText(/no results/i)).toBeInstanceOf(
          HTMLHeadingElement
        );
      });
    });
  });
});
