function JobSiteStatus({ jobCounts }) {
  return (
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
  );
}

export default JobSiteStatus;
