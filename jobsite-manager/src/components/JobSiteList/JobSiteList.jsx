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
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [newJobSite, setNewJobSite] = useState({
    name: "",
    status: "",
    category: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoryTextColors = {
    "Sidewalk Shed": "#0b9116",
    Scaffold: "#ffc107",
    Shoring: "#a30b8a",
  };

  const statusTextColors = {
    Completed: "#008000a8",
    "In Progress": "#33c233a8",
    "On Hold": "#ffc107",
  };

  const removeCategory = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.filter((selected) => selected !== category)
    );
  };

  const handleSelect = (status) => {
    setSelectedStatus(status);
    setNewJobSite((prev) => ({
      ...prev,
      status: status,
    }));
    setIsStatusOpen(false);
  };

  const toggleCategorySelection = (category) => {
    setSelectedCategories((prevSelected) => {
      const updatedCategories = prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category];

      setNewJobSite((prev) => ({
        ...prev,
        category: updatedCategories.join(", "),
      }));

      return updatedCategories;
    });
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleStatusDropdown = () => {
    setIsStatusOpen(!isStatusOpen);
  };

  const handleSave = () => {
    if (!newJobSite.name || !newJobSite.status || !newJobSite.category) {
      alert("All fields are required!");
      return;
    }
    const newId =
      jobSites.length > 0
        ? Math.max(...jobSites.map((site) => site.id)) + 1
        : 1;

    const newJobSiteWithId = { ...newJobSite, id: newId };

    createJobSite(newJobSiteWithId);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewJobSite({
      name: "",
      status: "",
      category: "",
    });
    setSelectedCategories([]);
    setSelectedStatus("");
  };

  const filteredJobSites = useMemo(() => {
    return jobSites.filter((site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobSites, searchTerm]);

  const jobCounts = useMemo(() => {
    const counts = { "On Road": 0, Completed: 0, "On Hold": 0 };
    jobSites.forEach((site) => {
      counts[site.status] = (counts[site.status] || 0) + 1;
    });
    return counts;
  }, [jobSites]);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <JobSiteStatus jobCounts={jobCounts} />
        <div className="list-container">
          <h2>Job Sites</h2>
          <div className="actions">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <button
              className="create-button"
              onClick={() => {
                setNewJobSite({
                  name: "",
                  status: "",
                  category: "",
                });
                setSelectedCategories([]);
                setSelectedStatus("");
                setIsModalOpen(true);
              }}
            >
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
          onClose={handleModalClose}
          onSave={handleSave}
          newJobSite={newJobSite}
          setNewJobSite={setNewJobSite}
          selectedCategories={selectedCategories}
          categoryTextColors={categoryTextColors}
          toggleCategoryDropdown={toggleCategoryDropdown}
          isCategoryOpen={isCategoryOpen}
          toggleCategorySelection={toggleCategorySelection}
          removeCategory={removeCategory}
          selectedStatus={selectedStatus}
          statusTextColors={statusTextColors}
          toggleStatusDropdown={toggleStatusDropdown}
          isStatusOpen={isStatusOpen}
          handleSelect={handleSelect}
        />
      </div>
    </div>
  );
}

export default JobSiteList;
