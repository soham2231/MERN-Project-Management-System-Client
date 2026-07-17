import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import PageHeader from "../../components/comman/PageHeader";
import TableToolbar from "../../components/comman/TableToolbar";
import CustomModal from "../../components/comman/CustomModal";
import UserTable from "../../components/user/UserTable";

import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../redux/slices/userSlice";

const Users = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <PageHeader title="Users" subtitle="Manage Users" />

      <TableToolbar search={search} setSearch={setSearch} />

      <UserTable
        users={filteredUsers}
        currentUser={user}
        onEdit={(u) => {
          setSelectedUser(u);

          setFormData({
            fullName: u.fullName,
            email: u.email,
          });

          setShowEdit(true);
        }}
        onDelete={(u) => {
          setSelectedUser(u);
          setShowDelete(true);
        }}
      />

      <CustomModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        title="Edit User"
      >
        <input
          className="form-control dark-input mb-3"
          value={formData.fullName}
          placeholder="Full Name"
          onChange={(e) =>
            setFormData({
              ...formData,
              fullName: e.target.value,
            })
          }
        />

        <input
          className="form-control dark-input mb-4"
          value={formData.email}
          placeholder="Email"
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <button
          className="primary-btn w-100"
          disabled={loading}
          onClick={async () => {
            const result = await dispatch(
              updateUser({
                id: selectedUser._id,
                data: formData,
              }),
            );

            if (!result.error) {
              toast.success(result.payload.message);
              setShowEdit(false);
              dispatch(getAllUsers());
            } else {
              toast.error(result.payload);
            }
          }}
        >
          Save Changes
        </button>
      </CustomModal>

      <CustomModal
        show={showDelete}
        onClose={() => setShowDelete(false)}
        title="Delete User"
      >
        <p>
          Delete <strong>{selectedUser?.fullName}</strong> ?
        </p>

        <button
          className="danger-btn w-100"
          onClick={async () => {
            const result = await dispatch(deleteUser(selectedUser._id));

            if (!result.error) {
              toast.success(result.payload.message);
              setShowDelete(false);
              dispatch(getAllUsers());
            } else {
              toast.error(result.payload);
            }
          }}
        >
          Delete
        </button>
      </CustomModal>
    </>
  );
};

export default Users;
