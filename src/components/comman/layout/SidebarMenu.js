import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaUserCheck,
  FaUsers,
  FaUser,
} from "react-icons/fa";

export const menuItems = {
  Admin: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: FaHome,
    },
    {
      title: "Projects",
      path: "/projects",
      icon: FaProjectDiagram,
    },
    {
      title: "Tasks",
      path: "/tasks",
      icon: FaTasks,
    },
    {
      title: "Assignments",
      path: "/assignments",
      icon: FaUserCheck,
    },
    {
      title: "Users",
      path: "/users",
      icon: FaUsers,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: FaUser,
    },
  ],

  HOD: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: FaHome,
    },
    {
      title: "Projects",
      path: "/projects",
      icon: FaProjectDiagram,
    },
    {
      title: "Tasks",
      path: "/tasks",
      icon: FaTasks,
    },
    {
      title: "Assignments",
      path: "/assignments",
      icon: FaUserCheck,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: FaUser,
    },
  ],

  Member: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: FaHome,
    },
    {
      title: "My Tasks",
      path: "/tasks",
      icon: FaTasks,
    },
    {
      title: "Assignments",
      path: "/assignments",
      icon: FaUserCheck,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: FaUser,
    },
  ],
};
