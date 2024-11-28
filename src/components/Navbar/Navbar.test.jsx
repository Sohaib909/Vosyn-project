import { render, screen } from "@/utils/testUtils";

import Navbar from "@/components/Navbar/Navbar";

// For NavLinks component
jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/mock-route"),
}));

describe("Navbar", () => {
  // Helper function to render component and get component elements
  const renderComponent = () => {
    render(<Navbar />);

    return {
      logo: screen.getByRole("link", { name: /vosynverse/i }),
      searchInput: screen.getByRole("combobox", { name: /search/i }),
    };
  };

  it("renders a home button and a search input", () => {
    const { logo, searchInput } = renderComponent();

    expect(logo).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe("");

    // TODO: Check rendering of other elements in Navbar
  });

  // TODO: Add more test cases
});
