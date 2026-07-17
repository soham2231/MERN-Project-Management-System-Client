import {
  FaEdit,
  FaTrash,
  FaUserShield,
  FaUserTie,
  FaUser,
} from "react-icons/fa";

const UserTable = ({ users, currentUser, onEdit, onDelete }) => {
  const roleIcon = (role) => {
    switch (role) {
      case "Admin":
        return <FaUserShield />;
      case "HOD":
        return <FaUserTie />;
      default:
        return <FaUser />;
    }
  };

  return (
    <div className="custom-table">
      <table className="table table-dark align-middle mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th width="130">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No Users Found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>

                <td>{user.email}</td>

                <td>
                  <span className="badge bg-primary d-flex align-items-center gap-2 w-fit">
                    {roleIcon(user.role)}
                    {user.role}
                  </span>
                </td>

                <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="icon-btn edit-btn"
                      onClick={() => onEdit(user)}
                    >
                      <FaEdit />
                    </button>

                    {currentUser?.role === "Admin" &&
                      currentUser.id !== user._id && (
                        <button
                          className="icon-btn delete-btn"
                          onClick={() => onDelete(user)}
                        >
                          <FaTrash />
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
