import { css, ThemeProvider } from "@emotion/react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as Icons from "@mui/icons-material";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { NavbarMenus } from "./NavMenusItem";

export default function NavMenus() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleListItemClick = (event, index, link) => {
    setSelectedIndex(index);
    navigate(link);
  };

  // 테마 설정
  const theme = createTheme({
    palette: {
      background: {
        paper: "#eceff2", // 선택되지 않은 항목의 배경색
      },
      primary: {
        main: "#637381", // 선택되지 않은 항목의 글꼴 색상
      },
      selected: {
        bg: "#e7effa", // 선택된 항목의 배경색
        color: "#1977f2",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          borderRadius: "8px",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {NavbarMenus.map((item) => {
          return (
            <ListItemButton
              selected={selectedIndex === item.id}
              onClick={(event) =>
                handleListItemClick(event, item.id, item.link)
              }
              sx={{
                borderRadius: "5px",
                "&.Mui-selected": {
                  bgcolor: "#e7effa", // 선택된 항목의 배경색
                },
                color:
                  selectedIndex === item.id
                    ? theme.palette.selected.color // 선택된 항목의 글꼴 색상
                    : theme.palette.primary.main, // 선택되지 않은 항목의 글꼴 색상
              }}
              key={item.id}
            >
              <ListItemIcon
                sx={{
                  color:
                    selectedIndex === item.id
                      ? theme.palette.selected.color // 선택된 항목의 글꼴 색상
                      : theme.palette.primary.main, // 선택되지 않은 항목의 글꼴 색상
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{
                  color:
                    selectedIndex === item.id
                      ? theme.palette.selected.main // 선택된 항목의 글꼴 색상
                      : theme.palette.primary.main, // 선택되지 않은 항목의 글꼴 색상
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </ThemeProvider>
  );
}
