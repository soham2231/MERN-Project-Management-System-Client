import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../redux/slices/projectSlice";

import PageHeader from "../../components/comman/PageHeader";
import Loader from "../../components/comman/Loader";
import EmptyState from "../../components/comman/EmptyState";

import ProjectTable from "../../components/project/ProjectTable";

import { useState } from "react";
import TableToolbar from "../../components/comman/TableToolbar";
import SelectInput from "../../components/comman/SelectInput";

import CustomModal from "../../components/comman/CustomModal";
import ProjectForm from "../../components/project/ProjectForm";
import toast from "react-hot-toast";
import StatusBadge from "../../components/comman/StatusBadge";

const Projects = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");
  // create btn
  const [showCreate, setShowCreate] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const { projects, loading } = useSelector((state) => state.project);
  // del btn
  const [showDelete, setShowDelete] = useState(false);

  const [deleteProjectId, setDeleteProjectId] = useState(null);
  // view btn
  const [showView, setShowView] = useState(false);

  const [viewProject, setViewProject] = useState(null);

  // =======================================================

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.projectName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = status === "" || project.status === status;

    return matchesSearch && matchesStatus;
  });

  // =========================================================

  const handleDelete = async () => {
    const result = await dispatch(deleteProject(deleteProjectId));

    if (!result.error) {
      toast.success(result.payload.message);

      setShowDelete(false);

      setDeleteProjectId(null);

      dispatch(getProjects());
    } else {
      toast.error(result.payload);
    }
  };

  // =============================================================

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <>
      <PageHeader title="Projects" subtitle="Manage all your projects" />

      {loading ? (
        <Loader />
      ) : projects.length === 0 ? (
        <EmptyState message="No Projects Found." />
      ) : (
        <>
          <TableToolbar
            search={search}
            setSearch={setSearch}
            button={
              <button
                onClick={() => setShowCreate(true)}
                className="primary-btn"
              >
                + Create Project
              </button>
            }
          >
            <SelectInput
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { label: "All Status", value: "" },
                { label: "Pending", value: "Pending" },
                { label: "In Progress", value: "In Progress" },
                { label: "Completed", value: "Completed" },
              ]}
            />
          </TableToolbar>

          {filteredProjects.length === 0 ? (
            <EmptyState message="No Projects Found." />
          ) : (
            <ProjectTable
              projects={filteredProjects}
              onView={(project) => {
                setViewProject(project);
                setShowView(true);
              }}
              onEdit={(project) => {
                setSelectedProject(project);
                setShowCreate(true);
              }}
              onDelete={(project) => {
                setDeleteProjectId(project._id);
                setShowDelete(true);
              }}
            />
          )}
        </>
      )}

      {/* =================create modal================== */}
      <CustomModal
        show={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedProject(null);
        }}
        title={selectedProject ? "Edit Project" : "Create Project"}
      >
        <ProjectForm
          loading={loading}
          initialData={selectedProject || {}}
          onSubmit={async (data) => {
            let result;

            if (selectedProject) {
              result = await dispatch(
                updateProject({
                  id: selectedProject._id,
                  data,
                }),
              );
            } else {
              result = await dispatch(createProject(data));
            }

            if (!result.error) {
              toast.success(result.payload.message);

              setShowCreate(false);
              setSelectedProject(null);

              dispatch(getProjects());
            } else {
              toast.error(result.payload);
            }
          }}
        />
      </CustomModal>

      {/* =================delete modal================== */}

      <CustomModal
        show={showDelete}
        onClose={() => {
          setShowDelete(false);
          setDeleteProjectId(null);
        }}
        title="Delete Project"
        width="450px"
      >
        <div className="text-center">
          <div
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto",
              borderRadius: "50%",
              background: "#EF4444",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: "30px",
            }}
          >
            🗑
          </div>

          <h4 className="mt-4">Delete Project</h4>

          <p className="text-secondary mb-4">This action cannot be undone.</p>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="secondary-btn"
              onClick={() => {
                setShowDelete(false);
                setDeleteProjectId(null);
              }}
            >
              Cancel
            </button>

            <button className="danger-btn" onClick={handleDelete}>
              Delete Project
            </button>
          </div>
        </div>
      </CustomModal>

      {/* =================delete modal================== */}

      <CustomModal
        show={showView}
        onClose={() => {
          setShowView(false);
          setViewProject(null);
        }}
        title="Project Details"
      >
        {viewProject && (
          <div className="project-view">
            <div className="view-item">
              <label>Project Name</label>
              <p>{viewProject.projectName}</p>
            </div>

            <div className="view-item">
              <label>Description</label>
              <p>{viewProject.description}</p>
            </div>

            <div className="row ">
              <div className="col-md-6 view-item">
                <label className="me-2">Status</label>
                <StatusBadge status={viewProject.status} />
              </div>

              <div className="col-md-6 view-item">
                <label>Created By</label>
                <p>{viewProject.createdBy?.fullName || "N/A"}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 view-item">
                <label>Start Date</label>
                <p>{new Date(viewProject.startDate).toLocaleDateString()}</p>
              </div>

              <div className="col-md-6 view-item">
                <label>End Date</label>
                <p>{new Date(viewProject.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </CustomModal>
    </>
  );
};

export default Projects;
