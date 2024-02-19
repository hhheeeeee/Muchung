import { useEffect, useMemo, useState } from "react";
// import PropTypes from "prop-types";
import { set, sub } from "date-fns";
// import { faker } from "@faker-js/faker";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import mailicon from "assets/icons/ic_notification_mail.svg";
import { EventSourcePolyfill } from "event-source-polyfill";
import Iconify from "components/iconify";
import Scrollbar from "components/common/scrollbar";
import { diffDates } from "@fullcalendar/core/internal";
import { BASE_URL } from "api/config";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import Scrollbar from "components/scrollbar";

// ----------------------------------------------------------------------

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default function NotificationsPopover() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [eventSource, setEventSource] = useState(null); // SSE 연결 상태 저장
  const [totalUnRead, setTotalUnRead] = useState(0);
  const connect = () => {
    const sseURL = `${BASE_URL}/notification/subscribe`;

    // 이미 연결이 존재하는 경우 연결을 닫습니다.
    if (eventSource) {
      console.log("끊김");
      eventSource.close();
    }

    const newEventSource = new EventSourcePolyfill(sseURL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      heartbeatTimeout: 120000,
      withCredentials: true,
    });

    newEventSource.addEventListener("sse", (event) => {
      if (event.data !== "연결 완료") {
        const copy = [];
        copy.push(JSON.parse(event.data));
        setNotifications(copy);
        setTotalUnRead((prev) => prev + 1); // 알림을 읽음 처리한 후 totalUnRead 값을 업데이트합니다.

        Toast.fire({
          icon: "info",
          title: "새로운 알림이 왔습니다",
        });
      }
    });

    newEventSource.addEventListener("connect", (event) => {
      console.log("연결 됨");
    });

    setEventSource(newEventSource);
  };

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/notification`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const copy = [...response.data];
        setNotifications(copy);
        setTotalUnRead(countUnread(copy));
        // 알림을 불러온 후 totalUnRead 값을 업데이트합니다.
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotification();
  }, []);

  // const [totalUnRead, setTotalUnRead] = useState(0);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handlePopover = () => {
    setOpen(null);
  };

  const handleDetailClick = async (id, notificationId) => {
    navigate(`/email/detail/sender/${id}`);
    setTotalUnRead((prev) => prev - 1); // 알림을 읽음 처리한 후 totalUnRead 값을 업데이트합니다.
    try {
      await axios.patch(
        `${BASE_URL}/notification/read/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const updatedNotifications = notifications.map((notification) => {
        if (notification.id === notificationId) {
          return { ...notification, read: true };
        }
        return notification;
      });
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error(error);
    }
  };

  // 기존의 countUnread 함수를 NotificationsPopover 컴포넌트 내부로 이동시킵니다.
  function countUnread(notifications) {
    console.log("안 읽은 알림의 수를 세는중...");
    return notifications.filter((item) => item.read === false).length;
  }

  return (
    <>
      <IconButton color={open ? "primary" : "default"} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={28} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      {notifications ? (
        <>
          <Popover
            open={!!open}
            anchorEl={open}
            onClose={handleClose}
            onClick={handlePopover}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                mt: 1.5,
                ml: 0.75,
                width: 360,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">알림</Typography>
              </Box>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
              <List disablePadding>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    handleDetailClick={handleDetailClick} // handleDetailClick 함수를 props로 전달합니다.
                  />
                ))}
              </List>
            </Scrollbar>
          </Popover>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function NotificationItem({ notification, handleDetailClick }) {
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.read && {
          bgcolor: "action.selected",
        }),
      }}
      onClick={() => handleDetailClick(notification.targetId, notification.id)} // handleDetailClick 함수를 호출합니다.
    >
      <ListItemAvatar>
        <Avatar alt="mailicon" src={mailicon} />
      </ListItemAvatar>
      <ListItemText
        primary={notification.content}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {notification.receivedDate}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
