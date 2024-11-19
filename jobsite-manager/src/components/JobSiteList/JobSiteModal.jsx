import { FaTimes, FaCheck } from "react-icons/fa";

function JobSiteModal({ isModalOpen, onClose, newJobSite, onChange, onSave }) {
  if (!isModalOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Create New Job Site</h3>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <div className="modal-body">
          <input
            type="text"
            value={newJobSite.name}
            onChange={(e) => onChange({ ...newJobSite, name: e.target.value })}
            placeholder="Job Site Name"
          />
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-button">
            Cancel <FaTimes />
          </button>
          <button onClick={onSave} className="modal-button">
            Save <FaCheck />
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobSiteModal;
