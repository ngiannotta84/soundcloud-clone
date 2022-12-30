import React from "react";
import { render, screen } from "@testing-library/react";
import Playlist from "../components/Playlist";
import fakePlaylist from "./testData/fakePlaylist";

describe("Playlist", () => {
  const validProps = {
    playlist: fakePlaylist,
    playlistIndex: 1,
    setPlaylistIndex: jest.fn(),
  };

  test("snapshot", () => {
    const { asFragment } = render(<Playlist {...validProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(<Playlist {...validProps} />);
    });

    test("renders correctly", () => {
      validProps.playlist.forEach((song) => {
        expect(
          screen.getByAltText(`${song.albumName} cover art`)
        ).toHaveAttribute("src", song.image);
        expect(screen.getByText(song.artistName)).toBeInTheDocument();
        expect(screen.getByText(song.songName)).toBeInTheDocument();
      });
      expect(screen.getAllByText(/play now/i)).toHaveLength(
        validProps.playlist.length
      );
    });
  });
});
