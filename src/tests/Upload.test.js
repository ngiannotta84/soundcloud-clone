import React from "react";
import { render, screen } from "@testing-library/react";
import Upload from "../components/Upload";

describe("Upload", () => {
  xtest("snapshot", () => {
    const { asFragment } = render(<Upload />);

    expect(asFragment()).toMatchSnapshot();
  });

  xdescribe("tests", () => {
    beforeEach(() => {
      render(<Upload />);
    });

    test("renders correctly", () => {
      expect(screen.getByText(/upload/i)).toBeInTheDocument();
    });
  });
});
