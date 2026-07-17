import StatCard from "./StatCard";

import {
  FaFolderOpen,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaTasks,
  FaUsers,
  FaUserTie,
  FaUserShield,
} from "react-icons/fa";

const StatsSection = ({ dashboard }) => {
  const role = dashboard.userRole;

  return (
    <>
      <div className="row">
        {/* ================= ADMIN ================= */}

        {role === "Admin" && (
          <>
            <StatCard
              title="Total Users"
              value={dashboard.users.totalUsers}
              icon={FaUsers}
              color="linear-gradient(135deg,#0EA5E9,#2563EB)"
            />

            <StatCard
              title="Admins"
              value={dashboard.users.totalAdmins}
              icon={FaUserShield}
              color="linear-gradient(135deg,#DC2626,#B91C1C)"
            />

            <StatCard
              title="HODs"
              value={dashboard.users.totalHODs}
              icon={FaUserTie}
              color="linear-gradient(135deg,#EC4899,#DB2777)"
            />

            <StatCard
              title="Members"
              value={dashboard.users.totalMembers}
              icon={FaUsers}
              color="linear-gradient(135deg,#8B5CF6,#7C3AED)"
            />

            <StatCard
              title="Projects"
              value={dashboard.projects.totalProjects}
              icon={FaFolderOpen}
              color="linear-gradient(135deg,#6366F1,#4F46E5)"
            />

            <StatCard
              title="Tasks"
              value={dashboard.tasks.totalTasks}
              icon={FaTasks}
              color="linear-gradient(135deg,#22C55E,#16A34A)"
            />
          </>
        )}

        {/* ================= HOD ================= */}

        {role === "HOD" && (
          <>
            <StatCard
              title="Total Users"
              value={dashboard.users.totalUsers}
              icon={FaUsers}
              color="linear-gradient(135deg,#0EA5E9,#2563EB)"
            />

            <StatCard
              title="Members"
              value={dashboard.users.totalMembers}
              icon={FaUsers}
              color="linear-gradient(135deg,#8B5CF6,#7C3AED)"
            />

            <StatCard
              title="My Projects"
              value={dashboard.projects.totalProjects}
              icon={FaFolderOpen}
              color="linear-gradient(135deg,#6366F1,#4F46E5)"
            />

            <StatCard
              title="Completed Projects"
              value={dashboard.projects.completedProjects}
              icon={FaCheckCircle}
              color="linear-gradient(135deg,#22C55E,#16A34A)"
            />

            <StatCard
              title="Pending Projects"
              value={dashboard.projects.pendingProjects}
              icon={FaClock}
              color="linear-gradient(135deg,#F59E0B,#D97706)"
            />

            <StatCard
              title="My Tasks"
              value={dashboard.tasks.totalTasks}
              icon={FaTasks}
              color="linear-gradient(135deg,#06B6D4,#0891B2)"
            />
          </>
        )}

        {/* ================= MEMBER ================= */}

        {role === "Member" && (
          <>
            <StatCard
              title="Assigned Tasks"
              value={dashboard.tasks.totalTasks}
              icon={FaTasks}
              color="linear-gradient(135deg,#8B5CF6,#7C3AED)"
            />

            <StatCard
              title="Completed Tasks"
              value={dashboard.tasks.completedTasks}
              icon={FaCheckCircle}
              color="linear-gradient(135deg,#22C55E,#16A34A)"
            />

            <StatCard
              title="Pending Tasks"
              value={dashboard.tasks.pendingTasks}
              icon={FaClock}
              color="linear-gradient(135deg,#F59E0B,#D97706)"
            />

            <StatCard
              title="In Progress"
              value={dashboard.tasks.inProgressTasks}
              icon={FaSpinner}
              color="linear-gradient(135deg,#06B6D4,#0891B2)"
            />
          </>
        )}
      </div>
    </>
  );
};

export default StatsSection;
