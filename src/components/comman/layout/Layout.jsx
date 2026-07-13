import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      className="d-flex"
      style={{
        background: "#0F172A",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          background: "#0F172A",
        }}
      >
        <Navbar />

        <div
          className="p-4"
          style={{
            background: "#0F172A",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
