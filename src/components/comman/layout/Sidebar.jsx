import { NavLink } from "react-router-dom";
import { menuItems } from "./SidebarMenu";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const role = user?.role || "Admin";

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#111827",
        borderRight: "1px solid #1F2937",
      }}
    >
      {/* Logo */}

      <div
        className="text-center"
        style={{
          padding: "28px 0",
          borderBottom: "1px solid #1F2937",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          PMS
        </h2>
      </div>

      {/* Menu */}

      <div className="mt-3">
        {menuItems[role]?.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `d-flex align-items-center text-decoration-none ${
                isActive ? "active-menu" : ""
              }`
            }
            style={{
              color: "#CBD5E1",
              padding: "14px 24px",
              margin: "8px 12px",
              borderRadius: "12px",
              transition: ".3s",
            }}
          >
            <item.icon size={20} />

            <span className="ms-3 fw-semibold">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
