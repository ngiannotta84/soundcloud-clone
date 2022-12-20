import React from "react";
import { render, screen } from "@testing-library/react";
import Upload from "../components/Upload";

xtest("renders title", () => {
  render(<Upload />);
  const linkElement = screen.getByText(/soundclone/i);

  expect(linkElement).toBeInTheDocument();
});
