import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import PageHeader from "../../components/comman/PageHeader";
import TableToolbar from "../../components/comman/TableToolbar";
import SelectInput from "../../components/comman/SelectInput";
import CustomModal from "../../components/comman/CustomModal";

import TaskTable from "../../components/task/TaskTable";
import TaskForm from "../../components/task/TaskForm";
import TaskView from "../../components/task/TaskView";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../redux/slices/taskSlice";
import { getMembers } from "../../redux/slices/userSlice";
import { getProjects } from "../../redux/slices/projectSlice";

const Tasks = () => {
  const dispatch = useDispatch();

  const { tasks, loading } = useSelector((state) => state.task);
  const { projects } = useSelector((state) => state.project);
  const { members } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const [showView, setShowView] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [showEdit, setShowEdit] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getProjects());
    dispatch(getMembers());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = status === "" || task.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <PageHeader title="Tasks" subtitle="Manage all tasks" />

      <TableToolbar
        search={search}
        setSearch={setSearch}
        button={
          <button className="primary-btn" onClick={() => setShowCreate(true)}>
            + Create Task
          </button>
        }
      >
        <SelectInput
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            {
              label: "All Status",
              value: "",
            },
            {
              label: "Pending",
              value: "Pending",
            },
            {
              label: "In Progress",
              value: "In Progress",
            },
            {
              label: "Completed",
              value: "Completed",
            },
          ]}
        />
      </TableToolbar>

      <TaskTable
        tasks={filteredTasks}
        onView={(task) => {
          setSelectedTask(task);
          setShowView(true);
        }}
        onEdit={(task) => {
          setSelectedTask(task);
          setShowEdit(true);
        }}
        onDelete={(task) => {
          setSelectedTask(task);
          setShowDelete(true);
        }}
      />

      {/* =========================create modal========================== */}
      <CustomModal
        show={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create Task"
      >
        <TaskForm
          projects={projects}
          members={members}
          loading={loading}
          onSubmit={async (formData) => {
            const result = await dispatch(createTask(formData));

            if (!result.error) {
              toast.success(result.payload.message);

              setShowCreate(false);

              dispatch(getTasks());
            } else {
              toast.error(result.payload);
            }
          }}
        />
      </CustomModal>

      {/* =================view modal ===========================*/}

      <CustomModal
        show={showView}
        onClose={() => setShowView(false)}
        title="Task Details"
      >
        <TaskView task={selectedTask} />
      </CustomModal>

      {/* =================edit modal ===========================*/}

      <CustomModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        title="Edit Task"
      >
        <TaskForm
          projects={projects}
          members={members}
          loading={loading}
          initialData={selectedTask || {}}
          onSubmit={async (formData) => {
            const result = await dispatch(
              updateTask({
                id: selectedTask._id,
                formData,
              }),
            );

            if (!result.error) {
              toast.success(result.payload.message);

              setShowEdit(false);

              dispatch(getTasks());
            } else {
              toast.error(result.payload);
            }
          }}
        />
      </CustomModal>

      {/* =================delete modal ===========================*/}

      <CustomModal
        show={showDelete}
        onClose={() => setShowDelete(false)}
        title="Delete Task"
      >
        <p className="mb-4">
          Are you sure you want to delete
          <strong> {selectedTask?.title}</strong>?
        </p>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="secondary-btn"
            onClick={() => setShowDelete(false)}
          >
            Cancel
          </button>

          <button
            className="danger-btn"
            onClick={async () => {
              const result = await dispatch(deleteTask(selectedTask._id));

              if (!result.error) {
                toast.success(result.payload.message);

                setShowDelete(false);

                dispatch(getTasks());
              } else {
                toast.error(result.payload);
              }
            }}
          >
            Delete
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default Tasks;
