function JobSiteTable({ jobSites, navigate }) {
  return (
    <table className="jobsite-table">
      <thead>
        <tr>
          <th>Jobsite Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {jobSites.map((site) => (
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
  );
}

export default JobSiteTable;
