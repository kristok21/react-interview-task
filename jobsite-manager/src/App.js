import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobSiteList from "./components/JobSiteList/JobSiteList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobSiteList />} />
      </Routes>
    </Router>
  );
}

export default App;
