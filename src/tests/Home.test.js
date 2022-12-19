import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";

describe("describe Home", () => {
  test("renders title", () => {
    render(<Home />);
    const linkElement = screen.getByText(/you are home/i);
    expect(linkElement).toBeInTheDocument();
  });
});
