import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JobSiteTable from "./JobSiteTable";

// Mock the navigate function from react-router
const mockNavigate = jest.fn();

// Sample jobSites data for testing
const jobSites = [
  { id: 1, name: "Site 1", status: "On Road" },
  { id: 2, name: "Site 2", status: "Completed" },
];

describe("JobSiteTable Component", () => {
  test("renders JobSiteTable correctly", () => {
    render(<JobSiteTable jobSites={jobSites} navigate={mockNavigate} />);

    // Test if the table headers are rendered
    expect(screen.getByText("Jobsite Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    // Test if job site names are rendered in the table
    expect(screen.getByText("Site 1")).toBeInTheDocument();
    expect(screen.getByText("Site 2")).toBeInTheDocument();

    // Test if job site statuses are rendered correctly
    expect(screen.getByText("On Road")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  test("navigates to correct path when jobsite name is clicked", () => {
    render(<JobSiteTable jobSites={jobSites} navigate={mockNavigate} />);

    // Simulate click on the first jobsite name (Site 1)
    fireEvent.click(screen.getByText("Site 1"));

    // Check if navigate function was called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith("/inventory-dashboard/1", {
      state: { jobSite: jobSites[0] },
    });
  });

  test("renders status with appropriate class", () => {
    render(<JobSiteTable jobSites={jobSites} navigate={mockNavigate} />);
  });
});
