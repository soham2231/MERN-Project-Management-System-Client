import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        data-bs-toggle="dropdown"
        style={{
          color: "#fff",
          background: "#334155",
          border: "none",
        }}
      >
        {user?.fullName}
      </button>

      <ul
        className="dropdown-menu dropdown-menu-end"
        style={{
          background: "#1E293B",
        }}
      >
        <li>
          <span
            className="dropdown-item-text"
            style={{
              color: "#94A3B8",
            }}
          >
            {user?.role}
          </span>
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <button className="dropdown-item text-danger" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
