import React from "react";
import { render } from "@testing-library/react";
import Alert from "../components/Alert";

xdescribe("Alert", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Alert message="" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays an error message", () => {
    const { asFragment } = render(<Alert message="Error!" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays a success message", () => {
    const { asFragment } = render(<Alert message="Success!!!!" success />);

    expect(asFragment()).toMatchSnapshot();
  });
});
