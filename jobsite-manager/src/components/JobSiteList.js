import React, { useState, useEffect, useMemo } from "react";
import { FaPlus, FaSearch, FaTimes, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./JobSiteList.css";

function JobSiteList() {
  const navigate = useNavigate();
  const [jobSites, setJobSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJobSite, setNewJobSite] = useState({
    name: "",
    status: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const toggleStatusDropdown = () => setIsStatusOpen(!isStatusOpen);
  const toggleCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);

  const handleSelect = (status) => {
    setSelectedStatus(status);
    setNewJobSite((prevState) => ({
      ...prevState,
      status: status,
    }));
    setIsStatusOpen(false);
  };
  const toggleCategorySelection = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      const updatedCategories = prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((item) => item !== category)
        : [...prevSelectedCategories, category];

      setNewJobSite((prevState) => ({
        ...prevState,
        category: updatedCategories.join(", "),
      }));

      return updatedCategories;
    });
  };

  const removeCategory = (category) => {
    setSelectedCategories(
      selectedCategories.filter((selected) => selected !== category)
    );
  };
  const categoryTextColors = {
    "Sidewalk Shed": "#0b9116",
    Scaffold: "#ffc107",
    Shoring: "#a30b8a",
  };
  const statusTextColors = {
    Completed: "#008000a8",
    "In Progress": "#33c233a8",
    "On Hold": "#dc3545",
  };

  useEffect(() => {
    if (isModalOpen) {
      setNewJobSite({
        name: "",
        status: "",
        category: "",
      });
      setSelectedCategories([]);
      setSelectedStatus("");
    }
  }, [isModalOpen]);

  useEffect(() => {
    const fetchJobSites = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/jobSites");
        if (!response.ok) {
          throw new Error(
            "Failed to fetch job sites. Please ensure the server is running."
          );
        }
        const data = await response.json();
        setJobSites(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobSites();
  }, []);

  const jobCounts = useMemo(() => {
    const counts = { "On Road": 0, Completed: 0, "On Hold": 0 };
    jobSites.forEach((site) => {
      counts[site.status] = (counts[site.status] || 0) + 1;
    });
    return counts;
  }, [jobSites]);

  const filteredJobSites = useMemo(() => {
    return jobSites.filter((site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobSites, searchTerm]);

  const handleCreateJobSite = async () => {
    const newId =
      jobSites.length > 0
        ? Math.max(...jobSites.map((site) => site.id)) + 1
        : 1;
    const jobSiteToCreate = { ...newJobSite, id: newId };

    try {
      const response = await fetch("http://localhost:5000/jobSites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobSiteToCreate),
      });

      if (!response.ok) {
        throw new Error("Failed to create job site. Please try again.");
      }

      const createdJobSite = await response.json();
      setJobSites((prevSites) => [...prevSites, createdJobSite]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Job Counts */}
        <div className="status-container">
          <div className="status-box on-road">
            <p>{jobCounts["On Road"]}</p>
            <h3>On Road</h3>
          </div>
          <div className="status-box completed">
            <p>{jobCounts.Completed}</p>
            <h3>Completed</h3>
          </div>
          <div className="status-box on-hold">
            <p>{jobCounts["On Hold"]}</p>
            <h3>On Hold</h3>
          </div>
        </div>

        <div className="list-container">
          <h2>Job Sites</h2>

          <div className="search-container">
            <div className="info-text">
              <p>List of all job sites</p>
            </div>
            <div className="actions">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search job sites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-bar"
                />
              </div>
              <button
                className="create-button"
                onClick={() => setIsModalOpen(true)}
              >
                Create <FaPlus />
              </button>
            </div>
          </div>

          {loading && <p>Loading job sites...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <table className="jobsite-table">
              <thead>
                <tr>
                  <th>Jobsite Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobSites.map((site) => (
                  <tr key={site.id}>
                    <td
                      className="jobsite-name"
                      onClick={() =>
                        navigate(`/inventory-dashboard/${site.id}`, {
                          state: { jobSite: site },
                        })
                      }
                    >
                      {site.name}
                    </td>
                    <td>
                      <div
                        className={`status ${site.status
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {site.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Create New Job Site</h3>
                <FaTimes
                  className="close-icon"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>

              <div className="modal-body">
                <div className="input-dropdown-container">
                  <label htmlFor="job-site-name" className="input-label">
                    Name
                  </label>
                  <input
                    id="job-site-name"
                    type="text"
                    placeholder="Type the job site's name"
                    value={newJobSite.name}
                    onChange={(e) =>
                      setNewJobSite({ ...newJobSite, name: e.target.value })
                    }
                  />

                  <div className="dropdown-row">
                    <div className="dropdown-column categoryCnt">
                      <label
                        htmlFor="job-site-category"
                        className="input-label"
                      >
                        Category Included
                      </label>
                      <div
                        className="dropdown-container"
                        onClick={toggleCategoryDropdown}
                      >
                        <div className="dropdown selected-category">
                          {selectedCategories.length ===
                          Object.keys(categoryTextColors).length
                            ? "All of them selected"
                            : "Select"}
                          <span
                            className={`caret ${isCategoryOpen ? "open" : ""}`}
                          >
                            &#9660;
                          </span>
                        </div>

                        {isCategoryOpen && (
                          <div className="dropdown-options">
                            {Object.keys(categoryTextColors).map((category) => (
                              <div
                                key={category}
                                className={`dropdown-option ${category
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")} ${
                                  selectedCategories.includes(category)
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  toggleCategorySelection(category)
                                }
                              >
                                {category}
                                <FaCheck className="checkmark-icon" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="selected-categories">
                        {selectedCategories.map((category, index) => (
                          <div key={index} className="category-item">
                            <span
                              className="bullet-point"
                              style={{
                                color: categoryTextColors[category] || "#000",
                              }}
                            >
                              •
                            </span>
                            {category}
                            <FaTimes
                              className="remove-icon"
                              onClick={() => removeCategory(category)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="dropdown-column statusCnt">
                      <label htmlFor="job-site-status" className="input-label">
                        Status
                      </label>
                      <div
                        className="dropdown-container"
                        onClick={toggleStatusDropdown}
                      >
                        <div className="dropdown selected-status">
                          <div>
                            {selectedStatus && (
                              <span
                                className="status-bullet"
                                style={{
                                  color:
                                    statusTextColors[selectedStatus] || "#000",
                                  marginRight: "8px",
                                }}
                              >
                                •
                              </span>
                            )}
                            {selectedStatus || "Select one"}
                          </div>
                          <span
                            className={`caret ${isStatusOpen ? "open" : ""}`}
                          >
                            &#9660;
                          </span>
                        </div>
                        {isStatusOpen && (
                          <div className="dropdown-options">
                            <div
                              className="dropdown-option completed"
                              onClick={() => handleSelect("Completed")}
                            >
                              Completed
                            </div>
                            <div
                              className="dropdown-option in-progress"
                              onClick={() => handleSelect("In Progress")}
                            >
                              In Progress
                            </div>
                            <div
                              className="dropdown-option on-hold"
                              onClick={() => handleSelect("On Hold")}
                            >
                              On Hold
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="modal-button"
                >
                  Cancel Changes
                  <FaTimes className="button-icon" />
                </button>

                <button onClick={handleCreateJobSite} className="modal-button">
                  Save Changes
                  <FaCheck className="button-icon" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobSiteList;
