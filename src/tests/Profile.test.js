import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "../components/Profile";

xtest("renders title", () => {
  render(<Profile />);
  const linkElement = screen.getByText(/soundclone/i);
  expect(linkElement).toBeInTheDocument();
});
