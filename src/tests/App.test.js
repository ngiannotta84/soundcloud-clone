import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";

describe("describe App", () => {
  test("renders title", () => {
    render(<App />);
    const getbyText = screen.getByText(/soundclone/i);

    expect(getbyText).toBeInTheDocument();
  });

  test("full app rendering/navigating", () => {
    render(<App />);
    const links = screen.getAllByRole("link");
    const [Home, Login] = links;

    // verify page content for default route
    expect(screen.getByText(/you are home/i)).toBeInTheDocument();
    fireEvent.click(Login);
    expect(screen.queryByText(/you are home/i)).not.toBeInTheDocument();
    fireEvent.click(Home);
    expect(screen.getByText(/you are home/i)).toBeInTheDocument();
  });

  test("displays the right number of links on the page", () => {
    render(<App />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
  });
});
