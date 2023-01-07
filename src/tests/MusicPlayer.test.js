import React from "react";
import { render, screen } from "@testing-library/react";
import MusicPlayer from "../components/MusicPlayer";
import fakePlaylist from "./testData/fakePlaylist";

describe("MusicPlayer", () => {
  const validProps = {
    playlist: fakePlaylist,
    playlistIndex: 1,
    setPlaylistIndex: jest.fn(),
    removeFromPlaylist: jest.fn(),
  };
  const audioPlay = jest.fn();
  const audioPause = jest.fn();

  jest
    .spyOn(window.HTMLMediaElement.prototype, "play")
    .mockImplementation(audioPlay);
  jest
    .spyOn(window.HTMLMediaElement.prototype, "pause")
    .mockImplementation(audioPause);

  test("snapshot", () => {
    const { asFragment } = render(<MusicPlayer {...validProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(<MusicPlayer {...validProps} />);
    });

    test("renders correctly", () => {
      const song = validProps.playlist[validProps.playlistIndex];
      const coverArt = screen.getByAltText(/cover art/i);

      expect(screen.getByTestId("audio")).toHaveAttribute("src", song.audio);
      expect(coverArt).toHaveAttribute("alt", `${song.albumName} cover art`);
      expect(coverArt).toHaveAttribute("src", song.image);
      expect(
        screen.getByText(`${song.artistName} - ${song.songName}`)
      ).toBeInstanceOf(HTMLHeadingElement);
      expect(screen.getByTestId("progressBar")).toHaveAttribute(
        "type",
        "range"
      );
      expect(screen.getByAltText(/skip backwards/i)).toBeInTheDocument();
      expect(screen.getByAltText(/play/i)).toBeInTheDocument();
      expect(screen.getByAltText(/skip forwards/i)).toBeInTheDocument();
      expect(screen.getByAltText(/volume/i)).toBeInTheDocument();
      expect(screen.getByAltText(/playlist/i)).toBeInTheDocument();
    });
  });
});
