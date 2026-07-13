import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../redux/slices/dashboardSlice";

import StatsSection from "../../components/dashboard/StatsSection";
import RecentProjects from "../../components/dashboard/RecentProjects";
import RecentTasks from "../../components/dashboard/RecentTasks";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { dashboard, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  if (loading) return <h3>Loading...</h3>;

  if (error) return <h3>{error}</h3>;

  if (!dashboard) return null;

  return (
    <div>
      <h2 className="section-title mb-4">Dashboard</h2>

      <StatsSection dashboard={dashboard} />

      <RecentProjects projects={dashboard.recentProjects} />

      <RecentTasks tasks={dashboard.recentTasks} />
    </div>
  );
};

export default Dashboard;
