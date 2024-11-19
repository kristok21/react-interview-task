// useJobSites.js
import { useState, useEffect } from "react";

const useJobSites = () => {
  const [jobSites, setJobSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobSites = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/jobSites");
        if (!response.ok) {
          throw new Error("Failed to fetch job sites.");
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

  return { jobSites, loading, error };
};

export default useJobSites;
