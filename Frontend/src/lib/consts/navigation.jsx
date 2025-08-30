import {
  HiOutlineViewGrid,
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
  HiOutlineMail,
  HiOutlineLogin,
} from "react-icons/hi";

// Top links in required order
export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid className="text-white" />,
  },
  {
    key: "transactions",
    label: "Transactions",
    path: "/transactions",
    icon: <HiOutlineDocumentText className="text-white" />,
  },
  {
    key: "schedules",
    label: "Schedules",
    path: "/schedules",
    icon: <HiOutlineCalendar className="text-white" />,
  },
  {
    key: "users",
    label: "Users",
    path: "/users",
    icon: <HiOutlineUsers className="text-white" />,
  },
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog className="text-white" />,
  },
];

// Bottom links (always at the very bottom)
export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "support",
    label: "Help",
    path: "/help",
    icon: <HiOutlineQuestionMarkCircle className="text-white" />,
  },
  {
    key: "contact",
    label: "Contact Us",
    path: "/contact-us",
    icon: <HiOutlineMail className="text-white" />,
  },
  {
    key: "sign-in",
    label: "Sign In",
    path: "/sign-in",
    icon: <HiOutlineLogin className="text-white" />,
  },
];
