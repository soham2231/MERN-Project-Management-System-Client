import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import DataTable from "../comman/DataTable";
import StatusBadge from "../comman/StatusBadge";
import PriorityBadge from "../comman/PriorityBadge";
import { useSelector } from "react-redux";

const TaskTable = ({ tasks, onView, onEdit, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const isMember = user?.role === "Member";

  return (
    <DataTable
      headers={["Task", "Project", "Priority", "Status", "Due Date", "Actions"]}
    >
      {tasks.map((task) => (
        <tr key={task._id}>
          <td>
            <div className="fw-semibold">{task.title}</div>

            <small className="text-secondary">
              {task.description?.slice(0, 40)}...
            </small>
          </td>

          <td>{task.project?.projectName || "-"}</td>

          <td>
            <PriorityBadge priority={task.priority} />
          </td>

          <td>
            <StatusBadge status={task.status} />
          </td>

          <td>{new Date(task.dueDate).toLocaleDateString()}</td>
          <td>
            <div className="table-actions">
              <button
                className="table-icon-btn view-btn"
                onClick={() => onView(task)}
              >
                <FaEye />
              </button>

              {!isMember && (
                <>
                  <button
                    className="table-icon-btn edit-btn"
                    onClick={() => onEdit(task)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="table-icon-btn delete-btn"
                    onClick={() => onDelete(task)}
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default TaskTable;
