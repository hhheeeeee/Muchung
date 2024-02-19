import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import FeedIcon from "@mui/icons-material/Feed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SendIcon from "@mui/icons-material/Send";

export const NavbarMenus = [
  {
    id: 0,
    link: "/main",
    icon: <SpaceDashboardIcon />,
    name: "DashBoard",
  },
  {
    id: 1,
    link: "feed",
    icon: <FeedIcon />,
    name: "Feed",
  },
  {
    id: 2,
    link: "calendar",
    icon: <CalendarMonthIcon />,
    name: "calendar",
  },
  {
    id: 3,
    link: "email/received",
    icon: <SendIcon />,
    name: "email",
  },
];
