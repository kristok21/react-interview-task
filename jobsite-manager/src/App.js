import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobSiteList from "./components/JobSiteList/JobSiteList";
import InventoryDashboard from "./components/InventoryDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobSiteList />} />
        <Route
          path="/inventory-dashboard/:id"
          element={<InventoryDashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
