import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Search from "../components/Search";
import * as getAlbums from "../requests/getAlbums";
import fakeAlbumData from "./testData/fakeAlbumData";

describe("Search", () => {
  const validProps = {
    handleSetPlaylist: jest.fn(),
  };

  describe("snapshots", () => {
    test("snapshot with user data", async () => {
      jest.spyOn(getAlbums, "default").mockResolvedValue(fakeAlbumData);

      let asFragment;
      await act(() => {
        const view = render(
          <Search handleSetPlaylist={validProps.handleSetPlaylist} />
        );
        asFragment = view.asFragment;
      });

      expect(asFragment()).toMatchSnapshot();
    });

    test("snapshot. no user data", async () => {
      jest.spyOn(getAlbums, "default").mockResolvedValue([]);

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
      jest.spyOn(getAlbums, "default").mockResolvedValue(fakeAlbumData);

      await act(() => {
        render(<Search handleSetPlaylist={validProps.handleSetPlaylist} />);
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

  describe("without data", () => {
    beforeEach(async () => {
      jest.spyOn(getAlbums, "default").mockResolvedValue([]);

      await act(() => {
        render(<Search handleSetPlaylist={validProps.handleSetPlaylist} />);
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
