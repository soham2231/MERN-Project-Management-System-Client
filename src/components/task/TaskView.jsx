const TaskView = ({ task }) => {
  if (!task) return null;

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label className="text-secondary small">Project</label>
        <div className="dark-detail">{task.project?.projectName}</div>
      </div>

      <div className="col-md-6">
        <label className="text-secondary small">Assigned To</label>
        <div className="dark-detail">{task.assignedTo?.fullName || "-"}</div>
      </div>

      <div className="col-12">
        <label className="text-secondary small">Title</label>
        <div className="dark-detail">{task.title}</div>
      </div>

      <div className="col-12">
        <label className="text-secondary small">Description</label>
        <div className="dark-detail">{task.description}</div>
      </div>

      <div className="col-md-4">
        <label className="text-secondary small">Priority</label>
        <div className="dark-detail">{task.priority}</div>
      </div>

      <div className="col-md-4">
        <label className="text-secondary small">Status</label>
        <div className="dark-detail">{task.status}</div>
      </div>

      <div className="col-md-4">
        <label className="text-secondary small">Due Date</label>
        <div className="dark-detail">
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>

      <div className="col-12">
        <label className="text-secondary small">Attachment</label>

        {task.attachment ? (
          <a
            href={`${import.meta.env.VITE_API_URL}/${task.attachment}`}
            target="_blank"
            rel="noreferrer"
            className="primary-link"
          >
            View Attachment
          </a>
        ) : (
          <div className="dark-detail">No Attachment</div>
        )}
      </div>
    </div>
  );
};

export default TaskView;
