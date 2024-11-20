// JobSiteList.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JobSiteList from "./components/JobSiteList/JobSiteList";
import { BrowserRouter as Router } from "react-router-dom";

describe("JobSiteList Component", () => {
  test("renders JobSiteList component", () => {
    render(
      <Router>
        <JobSiteList />
      </Router>
    );

    expect(screen.getByText("Job Sites")).toBeInTheDocument();

    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  test("opens modal when Create button is clicked", () => {
    render(
      <Router>
        <JobSiteList />
      </Router>
    );

    fireEvent.click(screen.getByText("Create"));

    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });
});
