import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import EditAlbum from "../components/EditAlbum";
import * as getAlbumById from "../requests/getAlbumById";
import * as deleteAlbum from "../requests/deleteAlbum";
import * as patchAlbum from "../requests/patchAlbum";
import * as patchSong from "../requests/patchSong";
import * as deleteSong from "../requests/deleteSong";
import * as postSongs from "../requests/postSongs";
import fakeAlbumData from "./testData/fakeAlbumData";

describe("Edit", () => {
  const deleteAlbumMock = jest.fn();
  const deleteSongMock = jest.fn();
  const patchAlbumMock = jest.fn();
  const patchSongMock = jest.fn();
  const postSongsMock = jest.fn();
  jest.spyOn(getAlbumById, "default").mockResolvedValue(fakeAlbumData[0]);
  jest.spyOn(deleteAlbum, "default").mockImplementation(deleteAlbumMock);
  jest.spyOn(deleteSong, "default").mockImplementation(deleteSongMock);
  jest.spyOn(patchAlbum, "default").mockImplementation(patchAlbumMock);
  jest.spyOn(patchSong, "default").mockImplementation(patchSongMock);
  jest.spyOn(postSongs, "default").mockImplementation(postSongsMock);

  test("snapshot", async () => {
    let asFragment;
    await act(() => {
      const view = render(
        <Router>
          <EditAlbum />
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
            <EditAlbum />
          </Router>
        );
      });
    });

    test("renders correctly", async () => {
      expect(screen.getByText(/^edit$/i)).toBeInstanceOf(HTMLHeadingElement);
      expect(screen.getByText(/edit album info/i)).toBeInstanceOf(
        HTMLHeadingElement
      );
      expect(screen.getByLabelText(/album name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/album artwork/i)).toBeInTheDocument();
      expect(screen.getByText(/edit songs/i)).toBeInstanceOf(
        HTMLHeadingElement
      );
      const addSongs = screen.getAllByText(/add song/i);
      expect(addSongs[0]).toBeInstanceOf(HTMLHeadingElement);
      expect(addSongs[1]).toBeInstanceOf(HTMLButtonElement);
      expect(screen.getByText(/cancel/i)).toBeInstanceOf(HTMLButtonElement);
      expect(screen.getByText(/delete album/i)).toBeInstanceOf(
        HTMLButtonElement
      );
      expect(screen.getByText(/save changes/i)).toBeInstanceOf(
        HTMLButtonElement
      );
    });

    test("add song", () => {
      const addSongButton = screen.getAllByText(/add song/i)[1];
      fireEvent.click(addSongButton);
      const inputs = screen.getAllByLabelText(/new song/i);

      expect(inputs[0]).toHaveAttribute("type", "text");
      expect(inputs[1]).toHaveAttribute("type", "file");
    });
  });
});
