function JobSiteStatus({ jobCounts }) {
  return (
    <div className="status-container">
      {["On Road", "Completed", "On Hold"].map((status) => (
        <div key={status} className={`status-box ${status.toLowerCase()}`}>
          <p>{jobCounts[status]}</p>
          <h3>{status}</h3>
        </div>
      ))}
    </div>
  );
}