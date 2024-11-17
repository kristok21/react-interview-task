import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobSiteList from "./components/JobSiteList";
import InventoryDashboard from "./components/InventoryDashboard"; // Import your InventoryDashboard component

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
