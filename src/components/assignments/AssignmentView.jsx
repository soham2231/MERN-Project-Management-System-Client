const AssignmentView = ({ assignment }) => {
  if (!assignment) return null;

  return (
    <>
      <div className="mb-3">
        <strong>Task</strong>
        <p>{assignment.task?.title}</p>
      </div>

      <div className="mb-3">
        <strong>Project</strong>
        <p>{assignment.task?.project?.projectName || "-"}</p>
      </div>

      <div className="mb-3">
        <strong>Assigned To</strong>
        <p>{assignment.assignedTo?.fullName}</p>
      </div>

      <div className="mb-3">
        <strong>Assigned By</strong>
        <p>{assignment.assignedBy?.fullName}</p>
      </div>

      <div className="mb-3">
        <strong>Status</strong>
        <p>{assignment.status}</p>
      </div>

      <div className="mb-3">
        <strong>Priority</strong>
        <p>{assignment.task?.priority}</p>
      </div>

      <div className="mb-3">
        <strong>Task Status</strong>
        <p>{assignment.task?.status}</p>
      </div>

      <div className="mb-0">
        <strong>Description</strong>
        <p>{assignment.task?.description || "-"}</p>
      </div>
    </>
  );
};

export default AssignmentView;
