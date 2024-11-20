import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./components/JobSiteList/SearchBar";

describe("SearchBar Component", () => {
  test("renders search input field and updates search term on change", () => {
    const onSearchChange = jest.fn();
    render(<SearchBar searchTerm="" onSearchChange={onSearchChange} />);

    // Check if the input field is rendered by its placeholder text
    const input = screen.getByPlaceholderText(/search job sites.../i);
    expect(input).toBeInTheDocument();

    // Simulate user typing in the input field
    fireEvent.change(input, { target: { value: "new search term" } });

    // Ensure the onSearchChange function was called
    expect(onSearchChange).toHaveBeenCalledTimes(1);
    expect(onSearchChange).toHaveBeenCalledWith("new search term");
  });
});
