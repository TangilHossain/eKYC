import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../components/Form";

// Mock fetch globally
const mockFetch = vi.fn();
globalThis.fetch = mockFetch as never;

describe("Form Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<Form />);

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Age")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("updates form fields on user input", async () => {
    const user = userEvent.setup();
    render(<Form />);

    const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const ageInput = screen.getByPlaceholderText("Age") as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText(
      "Message"
    ) as HTMLTextAreaElement;

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(ageInput, "30");
    await user.type(messageInput, "Test message");

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(ageInput.value).toBe("30");
    expect(messageInput.value).toBe("Test message");
  });

  it("submits form successfully", async () => {
    const user = userEvent.setup();
    const mockAlert = vi.spyOn(globalThis, 'alert').mockImplementation(() => {});
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Form saved successfully!" }),
    });

    render(<Form />);

    await user.type(screen.getByPlaceholderText("Name"), "John Doe");
    await user.type(screen.getByPlaceholderText("Email"), "john@example.com");
    await user.type(screen.getByPlaceholderText("Age"), "30");
    await user.type(screen.getByPlaceholderText("Message"), "Test message");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:5001/api/forms',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith("Form submitted successfully!");
    });

    mockAlert.mockRestore();
  });

  it('handles form submission error', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<Form />);

    await user.type(screen.getByPlaceholderText('Name'), 'John Doe');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalled();
    });
  });
});
