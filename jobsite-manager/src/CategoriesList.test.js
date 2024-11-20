import { render, screen, fireEvent } from "@testing-library/react";
import CategoriesList from "./components/InventoryDashboard/CategoriesList"; 
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("CategoriesList Component", () => {
  const mockSetSelectedCategory = jest.fn();
  const mockSetIsGridVisible = jest.fn();
  const mockNavigate = jest.fn();

  const jobSite = {
    name: "Test Job Site",
  };

  const selectedCategories = ["Sidewalk Shed", "Scaffold"];
  const selectedCategory = "Sidewalk Shed";

  beforeEach(() => {
    mockSetSelectedCategory.mockClear();
    mockSetIsGridVisible.mockClear();
    mockNavigate.mockClear();
  });

  it("renders job site name and categories correctly", () => {
    render(
      <Router>
        <CategoriesList
          jobSite={jobSite}
          selectedCategories={selectedCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={mockSetSelectedCategory}
          setIsGridVisible={mockSetIsGridVisible}
          navigate={mockNavigate}
        />
      </Router>
    );

    // Check if the job site name is displayed
    expect(screen.getByText("Test Job Site")).toBeInTheDocument();

    // Check if the categories are listed
    expect(screen.getByText("Sidewalk Shed")).toBeInTheDocument();
    expect(screen.getByText("Scaffold")).toBeInTheDocument();
  });

  it("shows 'No category selected' when no categories are selected", () => {
    render(
      <Router>
        <CategoriesList
          jobSite={jobSite}
          selectedCategories={[]}
          selectedCategory={selectedCategory}
          setSelectedCategory={mockSetSelectedCategory}
          setIsGridVisible={mockSetIsGridVisible}
          navigate={mockNavigate}
        />
      </Router>
    );

    expect(
      screen.getByText(
        "No category selected. Please select a service on your left to proceed."
      )
    ).toBeInTheDocument();
  });

  it("shows 'No job site selected' when no job site is passed", () => {
    render(
      <Router>
        <CategoriesList
          jobSite={null}
          selectedCategories={selectedCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={mockSetSelectedCategory}
          setIsGridVisible={mockSetIsGridVisible}
          navigate={mockNavigate}
        />
      </Router>
    );

    expect(screen.getByText("No job site selected")).toBeInTheDocument();
  });

  it("calls setSelectedCategory and setIsGridVisible when a category is clicked", () => {
    render(
      <Router>
        <CategoriesList
          jobSite={jobSite}
          selectedCategories={selectedCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={mockSetSelectedCategory}
          setIsGridVisible={mockSetIsGridVisible}
          navigate={mockNavigate}
        />
      </Router>
    );

    // Simulate clicking the "Sidewalk Shed" category
    fireEvent.click(screen.getByText("Sidewalk Shed"));

    expect(mockSetSelectedCategory).toHaveBeenCalledWith("Sidewalk Shed");
    expect(mockSetIsGridVisible).toHaveBeenCalledWith(true);
  });

  it("displays a checkmark when a category is selected", () => {
    render(
      <Router>
        <CategoriesList
          jobSite={jobSite}
          selectedCategories={selectedCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={mockSetSelectedCategory}
          setIsGridVisible={mockSetIsGridVisible}
          navigate={mockNavigate}
        />
      </Router>
    );
  });

  it("calls navigate function when 'Go Back' button is clicked", () => {
    render(
      <Router>
        <CategoriesList
          jobSite={jobSite}
          selectedCategories={selectedCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={mockSetSelectedCategory}
          setIsGridVisible={mockSetIsGridVisible}
          navigate={mockNavigate}
        />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: /go back/i }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
