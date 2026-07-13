import UserDropdown from "./UserDropdown";

const Navbar = () => {
  return (
    <nav
      className="navbar px-4 d-flex justify-content-between align-items-center"
      style={{
        background: "#1E293B",
        borderBottom: "1px solid #334155",
        height: "70px",
      }}
    >
      <h4
        className="mb-0 fw-bold"
        style={{
          color: "#F8FAFC",
        }}
      >
        Project Management System
      </h4>

      <UserDropdown />
    </nav>
  );
};

export default Navbar;