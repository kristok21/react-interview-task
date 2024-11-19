import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import useJobSites from "../../hooks/useJobSites";
import JobSiteStatus from "./JobSiteStatus";
import SearchBar from "./SearchBar";
import JobSiteTable from "./JobSiteTable";
import JobSiteModal from "./JobSiteModal";
import "../styles/JobSiteList.css";

function JobSiteList() {
  const navigate = useNavigate();
  const { jobSites, loading, error, createJobSite } = useJobSites();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJobSite, setNewJobSite] = useState({ name: "", status: "", category: "" });
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredJobSites = useMemo(() => {
    return jobSites.filter((site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobSites, searchTerm]);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <JobSiteStatus jobCounts={{ 'On Road': 0, Completed: 0, 'On Hold': 0 }} />
        <div className="list-container">
          <h2>Job Sites</h2>
          <div className="actions">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <button className="create-button" onClick={() => setIsModalOpen(true)}>
              Create <FaPlus />
            </button>
          </div>

          {loading && <p>Loading job sites...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <JobSiteTable jobSites={filteredJobSites} navigate={navigate} />
          )}
        </div>

        <JobSiteModal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          newJobSite={newJobSite}
          onChange={setNewJobSite}
          onSave={() => {
            createJobSite(newJobSite);
            setIsModalOpen(false);
          }}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
    </div>
  );
}

export default JobSiteList;
