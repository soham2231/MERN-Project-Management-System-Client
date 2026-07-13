import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

import DataTable from "../comman/DataTable";
import StatusBadge from "../comman/StatusBadge";

const ProjectTable = ({ projects }) => {
  return (
    <DataTable headers={["Project", "Status", "Duration", "Actions"]}>
      {projects.map((project) => (
        <tr key={project._id}>
          <td>
            <div className="fw-semibold">{project.projectName}</div>

            <small className="text-secondary">
              {project.description?.slice(0, 45)}...
            </small>
          </td>

          <td>
            <StatusBadge status={project.status} />
          </td>

          <td>
            <div>{new Date(project.startDate).toLocaleDateString()}</div>

            <small className="text-secondary">
              to {new Date(project.endDate).toLocaleDateString()}
            </small>
          </td>

          <td>
            <div className="table-actions">
              <button
                type="button"
                className="table-icon-btn view-btn"
                title="View"
              >
                <FaEye />
              </button>

              <button
                type="button"
                className="table-icon-btn edit-btn"
                title="Edit"
              >
                <FaEdit />
              </button>

              <button
                type="button"
                className="table-icon-btn delete-btn"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default ProjectTable;
