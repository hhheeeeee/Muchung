import { Home, Mail, CalendarMonth, Folder } from "@mui/icons-material";

export const NavbarMenus = [
  {
    id: 1,
    link: "/main",
    icon: <Home />,
    includes: "main",
    name: "Home",
  },
  {
    id: 2,
    link: "/mail",
    icon: <Mail />,
    includes: "mail",
    name: "Email",
  },
  {
    id: 3,
    link: "/calendar",
    icon: <CalendarMonth />,
    includes: "calendar",
    name: "Calendar",
  },
  {
    id: 4,
    link: "/report",
    icon: <Folder />,
    includes: "report",
    name: "업무보고",
  },
];
