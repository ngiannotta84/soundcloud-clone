import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Artist from "../components/Artist";

describe("Artist", () => {
  const validProps = {
    name: "valid name",
    image: "valid url",
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <Router>
        <Artist {...validProps} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(
        <Router>
          <Artist {...validProps} />
        </Router>
      );
    });

    test("renders correctly", () => {
      expect(screen.getByRole("img")).toHaveAttribute(
        "alt",
        `album by ${validProps.name}`
      );
      expect(screen.getByText(validProps.name)).toBeInstanceOf(
        HTMLHeadingElement
      );
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        `/profile/${validProps.name}`
      );
    });
  });
});
