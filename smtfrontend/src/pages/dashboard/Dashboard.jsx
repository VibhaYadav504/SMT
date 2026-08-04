import PageContainer from "../../components/common/PageContainer";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsGrid from "../../components/dashboard/StatsGrid";
import GrowthChart from "../../components/dashboard/GrowthChart";
import RecentStudents from "../../components/dashboard/RecentStudents";
import RecentActivity from "../../components/dashboard/RecentActivity";
import UpcomingClasses from "../../components/dashboard/UpcomingClasses";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentCourses from "../../components/dashboard/RecentCourses";

const Dashboard = () => {
  return (
    <PageContainer
      title="Dashboard"
      subtitle="Welcome to Skill Manthan Admin Panel"
    >
      <div className="space-y-8">

        {/* Welcome Banner */}
        <WelcomeBanner />

        {/* Statistics */}
        <StatsGrid />

        {/* Analytics */}
        <GrowthChart />

        {/* Students */}
        <RecentStudents />

        {/* Quick Actions & Recent Courses */}
        <div className="grid gap-8 xl:grid-cols-2">
          <QuickActions />
          <RecentCourses />
        </div>

        {/* Activity & Upcoming Classes */}
        <div className="grid gap-8 xl:grid-cols-2">
          <RecentActivity />
          <UpcomingClasses />
        </div>

      </div>
    </PageContainer>
  );
};

export default Dashboard;