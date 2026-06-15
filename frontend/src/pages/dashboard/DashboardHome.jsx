import DashboardWelcome from "../../components/dashboard/DashboardWelcome";
import DashboardQuickActions from "../../components/dashboard/DashboardQuickActions";
import DashboardRecentActivity from "../../components/dashboard/DashboardRecentActivity";

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      <DashboardWelcome />
      <DashboardQuickActions />
      <DashboardRecentActivity />
    </div>
  );
};

export default DashboardHome;
