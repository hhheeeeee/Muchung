import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import ShareIcon from "@mui/icons-material/Share";
import MessageIcon from "@mui/icons-material/Message";
import { Link } from "react-router-dom";
export default function BottomNav() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 999,
        height: "67px",
        maxWidth: "450px",
        minWidth: "320px",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to="/main/"
        />
        <BottomNavigationAction
          label="캘린더"
          icon={<EventIcon />}
          component={Link}
          to="/main/calendar"
        />
        <BottomNavigationAction
          label="공유함"
          icon={<ShareIcon />}
          component={Link}
          to="/main/feed"
        />
        <BottomNavigationAction
          label="쪽지함"
          icon={<MessageIcon />}
          component={Link}
          to="/email/received"
        />
      </BottomNavigation>
    </Box>
  );
}
