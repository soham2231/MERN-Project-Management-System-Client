import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProjects, createProject } from "../../redux/slices/projectSlice";

import PageHeader from "../../components/comman/PageHeader";
import Loader from "../../components/comman/Loader";
import EmptyState from "../../components/comman/EmptyState";

import ProjectTable from "../../components/project/ProjectTable";

import { useState } from "react";
import TableToolbar from "../../components/comman/TableToolbar";
import SelectInput from "../../components/comman/SelectInput";

import CustomModal from "../../components/comman/CustomModal";
import ProjectForm from "../../components/project/ProjectForm";

const Projects = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [showCreate, setShowCreate] = useState(false);

  const { projects, loading } = useSelector((state) => state.project);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.projectName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = status === "" || project.status === status;

    return matchesSearch && matchesStatus;
  });

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
            <ProjectTable projects={filteredProjects} />
          )}
        </>
      )}

      {/* =================modal================== */}
      <CustomModal
        show={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create Project"
      >
        <ProjectForm
          loading={loading}
          onSubmit={async (data) => {
            const result = await dispatch(createProject(data));

            if (!result.error) {
              setShowCreate(false);

              dispatch(getProjects());
            }
          }}
        />
      </CustomModal>
    </>
  );
};

export default Projects;
