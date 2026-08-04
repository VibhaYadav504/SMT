import {
  Users,
  BookOpen,
  MonitorPlay,
  IndianRupee,
} from "lucide-react";

import StatsCard from "./StatsCard";

const stats = [
  {
    title: "Total Students",
    value: "15,842",
    icon: Users,
    growth: "+12%",
    color: "bg-blue-500",
  },
  {
    title: "Total Courses",
    value: "245",
    icon: BookOpen,
    growth: "+8%",
    color: "bg-orange-500",
  },
  {
    title: "Live Classes",
    value: "28",
    icon: MonitorPlay,
    growth: "+5%",
    color: "bg-purple-500",
  },
  {
    title: "Revenue",
    value: "₹8.5L",
    icon: IndianRupee,
    growth: "+21%",
    color: "bg-green-500",
  },
];

const StatsGrid = () => {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatsCard
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          growth={item.growth}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default StatsGrid;