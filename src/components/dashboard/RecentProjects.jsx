import EmptyState from "../comman/EmptyState";
import StatusBadge from "../comman/StatusBadge";

const RecentProjects = ({ projects }) => {
  return (
    <div className="card card-dark border-0 shadow mt-4">
      <div className="card-header fw-bold fs-5">Recent Projects</div>

      <div className="table-responsive">
        {projects.length === 0 ? (
          <EmptyState message="No Recent Projects" />
        ) : (
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>

                <th>Status</th>

                <th>Start Date</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>{project.projectName}</td>

                  <td>
                    <StatusBadge status={project.status} />
                  </td>

                  <td>{new Date(project.startDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentProjects;
