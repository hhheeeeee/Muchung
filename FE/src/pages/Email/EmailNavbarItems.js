import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Favorite from "@mui/icons-material/Favorite";

export const EmailNavbarItems = [
  {
    id: 0,
    link: "received",
    icon: <MoveToInboxIcon />,
    name: "받은 쪽지함",
  },
  {
    id: 1,
    link: "sent",
    icon: <SendIcon />,
    name: "보낸 쪽지함",
  },
  {
    id: 2,
    link: "trash",
    icon: <DeleteIcon />,
    name: "휴지통",
  },
  {
    id: 3,
    link: "interest",
    icon: <Favorite />,
    name: "보관함",
  },
];
