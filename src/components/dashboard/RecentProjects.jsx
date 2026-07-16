import DataTable from "../comman/DataTable";
import EmptyState from "../comman/EmptyState";
import StatusBadge from "../comman/StatusBadge";

const RecentProjects = ({ projects }) => {
  if (projects.length === 0) return <EmptyState message="No Recent Projects" />;

  return (
    <DataTable
      title="Recent Projects"
      headers={["Project", "Status", "Start Date"]}
    >
      {projects.map((project) => (
        <tr key={project._id}>
          <td>
            <div className="fw-semibold">{project.projectName}</div>

            <small className="text-secondary">
              {project.description?.slice(0, 40)}...
            </small>
          </td>

          <td>
            <StatusBadge status={project.status} />
          </td>

          <td>{new Date(project.startDate).toLocaleDateString()}</td>
        </tr>
      ))}
    </DataTable>
  );
};

export default RecentProjects;
