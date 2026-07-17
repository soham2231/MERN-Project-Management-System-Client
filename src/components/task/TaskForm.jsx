import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const TaskForm = ({
  projects,
  members,
  loading,
  initialData = {},
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    project: "",
    assignedTo: "",
    title: "",
    description: "",
    priority: "Low",
    status: "Pending",
    dueDate: "",
    attachment: null,
  });

  useEffect(() => {
    if (Object.keys(initialData).length) {
      setFormData({
        project: initialData.project?._id || "",
        assignedTo: initialData.assignedTo?._id || "",
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "Low",
        status: initialData.status || "Pending",
        dueDate: initialData.dueDate?.split("T")[0] || "",
        attachment: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Project</label>

        <select
          className="form-select dark-input"
          name="project"
          value={formData.project}
          onChange={handleChange}
          required
        >
          <option value="">Select Project</option>

          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.projectName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Assign Member</label>

        <select
          className="form-select dark-input"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
        >
          <option value="">Select Member</option>

          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {member.fullName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Title</label>

        <input
          type="text"
          className="form-control dark-input"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>

        <textarea
          rows="4"
          className="form-control dark-input"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Priority</label>

          <select
            className="form-select dark-input"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Status</label>

          <select
            className="form-select dark-input"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Due Date</label>

        <input
          type="date"
          className="form-control dark-input"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Attachment</label>

        <input
          type="file"
          className="form-control dark-input"
          name="attachment"
          onChange={handleChange}
        />
      </div>

      <button
        className="primary-btn w-100 d-flex justify-content-center align-items-center gap-2"
        disabled={loading}
      >
        {loading && <FaSpinner className="spin-icon" />}

        {loading ? "Saving..." : "Save Task"}
      </button>
    </form>
  );
};

export default TaskForm;