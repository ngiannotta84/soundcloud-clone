import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "../components/App";
import * as getAlbums from "../requests/getAlbums";
import fakeAlbumData from "./testData/fakeAlbumData";

describe("App", () => {
  beforeEach(() => {
    jest.spyOn(getAlbums, "default").mockResolvedValue(fakeAlbumData);
  });

  test("snapshot", async () => {
    let asFragment;
    await act(() => {
      const view = render(<App />);
      asFragment = view.asFragment;
    });

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(async () => {
      await act(() => {
        render(<App />);
      });
    });

    test("renders correctly", async () => {
      expect(screen.getByText(/soundclone/i)).toBeInTheDocument();
      await waitFor(() => {
        expect(
          screen.getByAltText(`${fakeAlbumData[0].name} cover art`)
        ).toBeInTheDocument();
      });
    });

    test("full app rendering/navigating", async () => {
      const home = screen.getByText(/home/i);
      const login = screen.getByText(/login/i);

      fireEvent.click(login);
      await waitFor(() => {
        expect(
          screen.queryByAltText(`${fakeAlbumData[0].name} cover art`)
        ).not.toBeInTheDocument();
      });
      expect(screen.getByText(/please Login/i)).toBeInTheDocument();

      fireEvent.click(home);
      await waitFor(() => {
        expect(
          screen.getByAltText(`${fakeAlbumData[0].name} cover art`)
        ).toBeInTheDocument();
      });
      expect(screen.queryByText(/please Login/i)).not.toBeInTheDocument();
    });
  });
});
