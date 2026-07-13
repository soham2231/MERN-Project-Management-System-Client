import EmptyState from "../comman/EmptyState";
import StatusBadge from "../comman/StatusBadge";
import PriorityBadge from "../comman/PriorityBadge";

const RecentTasks = ({ tasks }) => {
  return (
    <div className="card card-dark border-0 shadow mt-4">

      <div className="card-header fw-bold fs-5">
        Recent Tasks
      </div>

      <div className="table-responsive">

        {tasks.length === 0 ? (
          <EmptyState message="No Recent Tasks" />
        ) : (
          <table className="table table-dark table-hover align-middle mb-0">

            <thead>

              <tr>

                <th>Title</th>

                <th>Status</th>

                <th>Priority</th>

              </tr>

            </thead>

            <tbody>

              {tasks.map((task) => (

                <tr key={task._id}>

                  <td>{task.title}</td>

                  <td>
                    <StatusBadge status={task.status} />
                  </td>

                  <td>
                    <PriorityBadge priority={task.priority} />
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default RecentTasks;