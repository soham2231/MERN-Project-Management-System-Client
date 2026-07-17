import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/comman/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Projects from "../pages/Project/Projects";
import Tasks from "../pages/Task/Tasks";
import Profile from "../pages/User/Profile";
import Users from "../pages/user/Users";
import Assignments from "../pages/assignments/Assignments";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          import Assignments from "../pages/Assignments/Assignments";
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<h2>404 Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;
