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

  const createJobSite = async (newJobSite) => {
    try {
      const response = await fetch("http://localhost:5000/jobSites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJobSite),
      });

      if (!response.ok) {
        throw new Error("Failed to create job site.");
      }

      const createdJobSite = await response.json();
      setJobSites((prevJobSites) => [...prevJobSites, createdJobSite]);
    } catch (err) {
      setError(err.message);
    }
  };

  return { jobSites, loading, error, createJobSite };
};

export default useJobSites;
