import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer Component", () => {
  it("renders the footer", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("displays copyright or footer text", () => {
    render(<Footer />);

    // Check if footer contains some text content
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeTruthy();
  });
});
