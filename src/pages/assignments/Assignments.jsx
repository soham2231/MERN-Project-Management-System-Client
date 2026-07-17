import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import PageHeader from "../../components/comman/PageHeader";
import TableToolbar from "../../components/comman/TableToolbar";
import CustomModal from "../../components/comman/CustomModal";

import AssignmentForm from "../../components/assignments/AssignmentForm";
import AssignmentTable from "../../components/assignments/AssignmentTable";
import AssignmentView from "../../components/assignments/AssignmentView";

import {
  getAssignments,
  assignTask,
  updateAssignmentStatus,
} from "../../redux/slices/taskAssignSlice";

import { getTasks } from "../../redux/slices/taskSlice";
import { getMembers } from "../../redux/slices/userSlice";

const Assignments = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { assignments, loading } = useSelector((state) => state.assignment);

  const { tasks } = useSelector((state) => state.task);

  const { members } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);

  const [showStatus, setShowStatus] = useState(false);

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [status, setStatus] = useState("");

  const [showView, setShowView] = useState(false);

  useEffect(() => {
    if (!user) return;

    dispatch(getAssignments());

    if (user.role !== "Member") {
      dispatch(getTasks());
      dispatch(getMembers());
    }
  }, [dispatch, user]);

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.task?.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <PageHeader title="Assignments" subtitle="Manage Task Assignments" />

      <TableToolbar
        search={search}
        setSearch={setSearch}
        button={
          user?.role !== "Member" && (
            <button className="primary-btn" onClick={() => setShowCreate(true)}>
              + Assign Task
            </button>
          )
        }
      />

      <AssignmentTable
        assignments={filteredAssignments}
        onView={(assignment) => {
          setSelectedAssignment(assignment);
          setShowView(true);
        }}
        onUpdateStatus={(assignment) => {
          setSelectedAssignment(assignment);
          setStatus(assignment.status);
          setShowStatus(true);
        }}
      />

      {/*===================================== Assign =====================================*/}

      <CustomModal
        show={showCreate}
        onClose={() => setShowCreate(false)}
        title="Assign Task"
      >
        <AssignmentForm
          tasks={tasks}
          members={members}
          loading={loading}
          onSubmit={async (formData) => {
            const result = await dispatch(assignTask(formData));

            if (!result.error) {
              toast.success(result.payload.message);

              setShowCreate(false);

              dispatch(getAssignments());
            } else {
              toast.error(result.payload);
            }
          }}
        />
      </CustomModal>
      {/* ===================================== view ===================================== */}
      <CustomModal
        show={showView}
        onClose={() => setShowView(false)}
        title="Assignment Details"
      >
        <AssignmentView assignment={selectedAssignment} />
      </CustomModal>

      {/* ===============================Status===================================== */}

      <CustomModal
        show={showStatus}
        onClose={() => setShowStatus(false)}
        title="Update Assignment Status"
      >
        <select
          className="form-select dark-input mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Assigned</option>
          <option>Accepted</option>
          <option>Completed</option>
        </select>

        <button
          className="primary-btn w-100"
          onClick={async () => {
            const result = await dispatch(
              updateAssignmentStatus({
                id: selectedAssignment._id,
                data: {
                  status,
                },
              }),
            );

            if (!result.error) {
              toast.success(result.payload.message);

              setShowStatus(false);

              dispatch(getAssignments());

              dispatch(getTasks());
            } else {
              toast.error(result.payload);
            }
          }}
        >
          Update Status
        </button>
      </CustomModal>
    </>
  );
};

export default Assignments;
