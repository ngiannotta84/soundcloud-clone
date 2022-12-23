import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Song from "../components/Song";

describe("Song", () => {
  const validProps = {
    artistName: "artist",
    albumName: "album",
    albumArt: "alburl",
    songName: "song",
    songAudio: "songurl",
    handleSetPlaylist: jest.fn(),
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <Router>
        <Song {...validProps} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(
        <Router>
          <Song {...validProps} />
        </Router>
      );
    });

    test("renders correctly", () => {
      expect(screen.getByRole("img")).toHaveAttribute(
        "alt",
        `${validProps.albumName} cover art`
      );
      expect(screen.getByText(validProps.artistName)).toHaveAttribute(
        "href",
        `/profile/${validProps.artistName}`
      );
      expect(screen.getByText(validProps.songName)).toBeInstanceOf(
        HTMLHeadingElement
      );
      expect(screen.getByText(/add to queue/i)).toBeInstanceOf(
        HTMLButtonElement
      );
      expect(screen.getByText(/play next/i)).toBeInstanceOf(HTMLButtonElement);
    });

    test("add to queue button", () => {
      const button = screen.getByText(/add to queue/i);
      const data = {
        image: validProps.albumArt,
        artistName: validProps.artistName,
        albumName: validProps.albumName,
        songName: validProps.songName,
        audio: validProps.songAudio,
      };

      fireEvent.click(button);

      expect(validProps.handleSetPlaylist).toBeCalledWith(data, false);
    });

    test("play next button", () => {
      const button = screen.getAllByText(/play next/i)[0];
      const data = {
        image: validProps.albumArt,
        artistName: validProps.artistName,
        albumName: validProps.albumName,
        songName: validProps.songName,
        audio: validProps.songAudio,
      };

      fireEvent.click(button);

      expect(validProps.handleSetPlaylist).toBeCalledWith(data, true);
    });
  });
});
