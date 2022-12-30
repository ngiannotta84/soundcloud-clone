import React from "react";
import { render, screen } from "@testing-library/react";

xtest("renders title", () => {
  // eslint-disable-next-line react/jsx-no-undef
  render(<Upload />);
  const linkElement = screen.getByText(/soundclone/i);

  expect(linkElement).toBeInTheDocument();
});
