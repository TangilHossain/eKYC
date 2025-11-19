import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header Component", () => {
  it("renders the header title", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText(/eKYC/i)).toBeInTheDocument();
  });

  it("renders heading element", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("eKYC Form");
  });
});
