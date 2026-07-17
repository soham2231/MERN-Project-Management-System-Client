import { FaEye, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

import DataTable from "../comman/DataTable";
import StatusBadge from "../comman/StatusBadge";

const AssignmentTable = ({ assignments, onView, onUpdateStatus }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <DataTable
      headers={[
        "Task",
        "Project",
        "Member",
        "Assigned By",
        "Status",
        "Actions",
      ]}
    >
      {assignments.map((assignment) => (
        <tr key={assignment._id}>
          <td>{assignment.task?.title}</td>

          <td>{assignment.task?.project?.projectName || "-"}</td>

          <td>{assignment.assignedTo?.fullName}</td>

          <td>{assignment.assignedBy?.fullName}</td>

          <td>
            <StatusBadge status={assignment.status} />
          </td>

          <td>
            <div className="table-actions">
              <button
                className="table-icon-btn view-btn"
                onClick={() => onView(assignment)}
              >
                <FaEye />
              </button>

              {(user.role === "Member" ||
                user.role === "Admin" ||
                user.role === "HOD") && (
                <button
                  className="table-icon-btn edit-btn"
                  onClick={() => onUpdateStatus(assignment)}
                >
                  <FaEdit />
                </button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default AssignmentTable;
