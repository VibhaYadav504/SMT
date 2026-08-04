import {
  Users,
  UserCheck,
  UserX,
  GraduationCap,
} from "lucide-react";

import StudentStatCard from "./StudentStatCard";

const StudentStats = ({ students }) => {

  const total = students.length;

  const active = students.filter(
    (s) => s.status === "Active"
  ).length;

  const inactive = students.filter(
    (s) => s.status === "Inactive"
  ).length;

  const completed = students.filter(
    (s) => s.status === "Completed"
  ).length;

  return (
    <div className="mb-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StudentStatCard
        title="Total Students"
        value={total}
        icon={Users}
        color="text-blue-600"
        bg="bg-blue-100"
      />

      <StudentStatCard
        title="Active"
        value={active}
        icon={UserCheck}
        color="text-green-600"
        bg="bg-green-100"
      />

      <StudentStatCard
        title="Inactive"
        value={inactive}
        icon={UserX}
        color="text-red-600"
        bg="bg-red-100"
      />

      <StudentStatCard
        title="Completed"
        value={completed}
        icon={GraduationCap}
        color="text-orange-600"
        bg="bg-orange-100"
      />

    </div>
  );
};

export default StudentStats;