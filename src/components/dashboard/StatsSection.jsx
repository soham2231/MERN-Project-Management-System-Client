import StatCard from "./StatCard";

import {
  FaFolderOpen,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaTasks,
} from "react-icons/fa";

const StatsSection = ({ dashboard }) => {
  return (
    <>
      <div className="row">
        <StatCard
          title="Total Projects"
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
          title="In Progress"
          value={dashboard.projects.inProgressProjects}
          icon={FaSpinner}
          color="linear-gradient(135deg,#06B6D4,#0891B2)"
        />

        <StatCard
          title="Total Tasks"
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
      </div>
    </>
  );
};

export default StatsSection;
