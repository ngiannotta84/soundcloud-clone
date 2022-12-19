import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "../components/Search";

xtest("renders title", () => {
  render(<Search />);
  const linkElement = screen.getByText(/soundclone/i);
  expect(linkElement).toBeInTheDocument();
});
