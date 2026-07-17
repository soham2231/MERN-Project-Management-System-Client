import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const AssignmentForm = ({ tasks, members, loading, onSubmit }) => {
  const [formData, setFormData] = useState({
    task: "",
    assignedTo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Task</label>

        <select
          className="form-select dark-input"
          name="task"
          value={formData.task}
          onChange={handleChange}
          required
        >
          <option value="">Select Task</option>

          {tasks.map((task) => (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label">Member</label>

        <select
          className="form-select dark-input"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          required
        >
          <option value="">Select Member</option>

          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {member.fullName}
            </option>
          ))}
        </select>
      </div>

      <button
        className="primary-btn w-100 d-flex justify-content-center align-items-center gap-2"
        disabled={loading}
      >
        {loading && <FaSpinner className="spin-icon" />}
        {loading ? "Assigning..." : "Assign Task"}
      </button>
    </form>
  );
};

export default AssignmentForm;
