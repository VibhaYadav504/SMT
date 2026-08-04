import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers3,
  MonitorPlay,
  Image,
  Bell,
  FileText,
  Award,
  MessageSquare,
  HelpCircle,
  Settings,
  UserCog,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Students",
    icon: Users,
    path: "/students",
  },
  {
    title: "Courses",
    icon: BookOpen,
    path: "/courses",
  },
  {
    title: "Categories",
    icon: Layers3,
    path: "/categories",
  },
  {
    title: "Live Classes",
    icon: MonitorPlay,
    path: "/live-classes",
  },
  {
    title: "Banners",
    icon: Image,
    path: "/banners",
  },
  {
    title: "Notices",
    icon: Bell,
    path: "/notices",
  },
  {
    title: "Certificates",
    icon: Award,
    path: "/certificates",
  },
  {
    title: "Gallery",
    icon: Image,
    path: "/gallery",
  },
  {
    title: "Testimonials",
    icon: MessageSquare,
    path: "/testimonials",
  },
  {
    title: "FAQ",
    icon: HelpCircle,
    path: "/faq",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    title: "Profile",
    icon: UserCog,
    path: "/profile",
  },
  {
    title: "Logout",
    icon: LogOut,
    path: "/logout",
  },
];

export default menuItems;