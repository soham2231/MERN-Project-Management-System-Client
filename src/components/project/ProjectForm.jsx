import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const ProjectForm = ({ initialData = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Pending",
  });

  useEffect(() => {
    if (Object.keys(initialData).length) {
      setFormData({
        projectName: initialData.projectName || "",
        description: initialData.description || "",
        startDate: initialData.startDate?.split("T")[0] || "",
        endDate: initialData.endDate?.split("T")[0] || "",
        status: initialData.status || "Pending",
      });
    }
  }, [initialData]);

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
        <label className="form-label">Project Name</label>

        <input
          className="form-control dark-input"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>

        <textarea
          className="form-control dark-input"
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Start Date</label>

          <input
            type="date"
            className="form-control dark-input"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">End Date</label>

          <input
            type="date"
            className="form-control dark-input"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-4">
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

      <button
        className="primary-btn w-100 d-flex justify-content-center align-items-center gap-2"
        disabled={loading}
      >
        {loading && <FaSpinner className="spin-icon" />}

        {loading ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
