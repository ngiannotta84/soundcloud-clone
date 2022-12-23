import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../components/Home";
import * as getAlbums from "../requests/getAlbums";
import fakeAlbumData from "./testData/fakeAlbumData";

describe("Home", () => {
  const validProps = {
    handleSetPlaylist: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(getAlbums, "default").mockResolvedValue(fakeAlbumData);
  });

  test("snapshot", async () => {
    let asFragment;
    await act(() => {
      const view = render(
        <Router>
          <Home handleSetPlaylist={validProps.handleSetPlaylist} />
        </Router>
      );
      asFragment = view.asFragment;
    });

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(async () => {
      await act(() => {
        render(
          <Router>
            <Home handleSetPlaylist={validProps.handleSetPlaylist} />
          </Router>
        );
      });
    });

    test("renders correctly", async () => {
      await waitFor(() => {
        const images = screen.getAllByRole("img");

        expect(images).toHaveLength(fakeAlbumData.length);
        expect(images[0]).toHaveAttribute(
          "alt",
          `${fakeAlbumData[0].name} cover art`
        );
      });
    });
  });
});
