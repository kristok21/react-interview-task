// JobSiteModal.js
import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

const JobSiteModal = ({
  isOpen,
  onClose,
  newJobSite,
  setNewJobSite,
  selectedCategories,
  setSelectedCategories,
  toggleCategoryDropdown,
  isCategoryOpen,
  categoryTextColors,
  toggleCategorySelection,
  removeCategory,
  selectedStatus,
  setSelectedStatus,
  isStatusOpen,
  toggleStatusDropdown,
  handleCreateJobSite,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Create New Job Site</h3>
          <FaTimes className="close-icon" onClick={onClose} />
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
                <label htmlFor="job-site-category" className="input-label">
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
                    <span className={`caret ${isCategoryOpen ? "open" : ""}`}>
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
                          onClick={() => toggleCategorySelection(category)}
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
                    {selectedStatus || "Select one"}
                    <span className={`caret ${isStatusOpen ? "open" : ""}`}>
                      &#9660;
                    </span>
                  </div>
                  {isStatusOpen && (
                    <div className="dropdown-options">
                      <div
                        className="dropdown-option completed"
                        onClick={() => setSelectedStatus("Completed")}
                      >
                        Completed
                      </div>
                      <div
                        className="dropdown-option in-progress"
                        onClick={() => setSelectedStatus("In Progress")}
                      >
                        In Progress
                      </div>
                      <div
                        className="dropdown-option on-hold"
                        onClick={() => setSelectedStatus("On Hold")}
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
          <button onClick={onClose} className="modal-button">
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
  );
};

export default JobSiteModal;
