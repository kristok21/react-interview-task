import { FaTimes, FaCheck } from "react-icons/fa";

function JobSiteModal({
  isModalOpen,
  onClose,
  onSave,
  newJobSite,
  setNewJobSite,
  selectedCategories,
  categoryTextColors,
  toggleCategoryDropdown,
  isCategoryOpen,
  toggleCategorySelection,
  removeCategory,
  selectedStatus,
  statusTextColors,
  toggleStatusDropdown,
  isStatusOpen,
  handleSelect,
}) {
  if (!isModalOpen) return null;

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
                    <div>
                      {selectedStatus && (
                        <span
                          className="status-bullet"
                          style={{
                            color: statusTextColors[selectedStatus] || "#000",
                            marginRight: "8px",
                          }}
                        >
                          •
                        </span>
                      )}
                      {selectedStatus || "Select one"}
                    </div>
                    <span className={`caret ${isStatusOpen ? "open" : ""}`}>
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
          <button onClick={onClose} className="modal-button">
            Cancel Changes <FaTimes />
          </button>
          <button onClick={onSave} className="modal-button">
            Save Changes <FaCheck />
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobSiteModal;
