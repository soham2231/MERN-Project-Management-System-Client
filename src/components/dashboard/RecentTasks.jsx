import DataTable from "../comman/DataTable";
import EmptyState from "../comman/EmptyState";
import StatusBadge from "../comman/StatusBadge";
import PriorityBadge from "../comman/PriorityBadge";

const RecentTasks = ({ tasks }) => {
  if (tasks.length === 0) return <EmptyState message="No Recent Tasks" />;

  return (
    <DataTable title="Recent Tasks" headers={["Task", "Status", "Priority"]}>
      {tasks.map((task) => (
        <tr key={task._id}>
          <td>
            <div className="fw-semibold">{task.title}</div>

            <small className="text-secondary">
              {task.description?.slice(0, 40)}...
            </small>
          </td>

          <td>
            <StatusBadge status={task.status} />
          </td>

          <td>
            <PriorityBadge priority={task.priority} />
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default RecentTasks;
