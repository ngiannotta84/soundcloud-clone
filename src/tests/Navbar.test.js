import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  test("renders links", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const linkElement = screen.getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("renders links", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const linkelement = screen.getByText(/Home/i);
    expect(linkelement).toHaveAttribute("href", "/");
  });
});
