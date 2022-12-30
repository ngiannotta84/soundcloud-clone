import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Album from "../components/Album";

describe("Album", () => {
  const validProps = {
    artistName: "artist",
    albumName: "album",
    albumArt: "album url",
    songs: [
      {
        id: "1",
        name: "song 1",
        position: "1",
        url: "song url 1",
      },
      {
        id: "2",
        name: "song 2",
        position: "0",
        url: "song url 2",
      },
    ],
    handleSetPlaylist: jest.fn(),
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <Router>
        <Album {...validProps} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(
        <Router>
          <Album {...validProps} />
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
      expect(screen.getByText(validProps.albumName)).toBeInstanceOf(
        HTMLHeadingElement
      );
      expect(screen.getAllByText(/add to queue/i)).toHaveLength(
        validProps.songs.length
      );
      expect(screen.getAllByText(/play next/i)).toHaveLength(
        validProps.songs.length
      );
      validProps.songs.forEach((song) => {
        expect(screen.getByText(song.name)).toBeInstanceOf(HTMLHeadingElement);
      });
    });

    test("add to queue button", () => {
      const button = screen.getAllByText(/add to queue/i)[0];
      const data = {
        image: validProps.albumArt,
        artistName: validProps.artistName,
        albumName: validProps.albumName,
        songName: validProps.songs[0].name,
        audio: validProps.songs[0].url,
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
        songName: validProps.songs[0].name,
        audio: validProps.songs[0].url,
      };

      fireEvent.click(button);

      expect(validProps.handleSetPlaylist).toBeCalledWith(data, true);
    });
  });
});
