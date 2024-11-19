import { FaSearch } from "react-icons/fa";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-wrapper">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search job sites..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-bar"
      />
    </div>
  );
}

export default SearchBar;
