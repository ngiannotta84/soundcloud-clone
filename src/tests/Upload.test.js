import React from "react";
import { render, screen } from "@testing-library/react";

describe("Upload", () => {
  test("snapshot", () => {
    const { asFragment } = render(<Upload />);
  
    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(<Upload />);
    });

    test("renders correctly", () => {
      expect(screen.getByText(/upload/i)).toBeInTheDocument();
    });
  });
});
