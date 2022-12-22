import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Profile from "../components/Profile";
import * as getUsers from "../requests/getUsers";
import fakeUserData from "./testData/fakeUserData";

describe("Profile", () => {
  const validProps = {
    handleSetPlaylist: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(getUsers, "default").mockResolvedValue(fakeUserData);
  });

  test("snapshot", async () => {
    let asFragment;
    await act(() => {
      const view = render(
        <Profile handleSetPlaylist={validProps.handleSetPlaylist} />
      );
      asFragment = view.asFragment;
    });

    expect(asFragment()).toMatchSnapshot();
  });

  describe("truthy response", () => {
    beforeEach(async () => {
      await act(() => {
        render(<Profile handleSetPlaylist={validProps.handleSetPlaylist} />);
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
});
