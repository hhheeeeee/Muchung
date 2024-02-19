/** @jsxImportSource @emotion/react */
import { css, ThemeProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { EmailNavbarItems } from "./EmailNavbarItems";

export default function EmailNavbar() {
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
        paper: "#eceff2",
      },
      primary: {
        main: "#637381",
      },
      selected: {
        bg: "#e7effa",
        color: "#1977f2",
      },
    },
  });

  return (
    <div css={navbarContainer}>
      <Button
        onClick={() => {
          setSelectedIndex(-1);
          navigate("create");
        }}
        variant="contained"
        startIcon={<CreateIcon />}
        css={button}
      >
        메일쓰기
      </Button>
      <ThemeProvider theme={theme}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            padding: 0,
            overflowX: "auto", // 모바일 뷰에서 넘치는 경우 스크롤 가능하도록 설정
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {EmailNavbarItems.map((item) => (
            <ListItemButton
              selected={selectedIndex === item.id}
              onClick={(event) =>
                handleListItemClick(event, item.id, item.link)
              }
              sx={{
                borderRadius: "5px",
                "&.Mui-selected": {
                  bgcolor: "#e7effa",
                },
                color:
                  selectedIndex === item.id
                    ? theme.palette.selected.color
                    : theme.palette.primary.main,
                padding: "8px 16px",
              }}
              key={item.id}
            >
              <ListItemIcon
                sx={{
                  color:
                    selectedIndex === item.id
                      ? theme.palette.selected.color
                      : theme.palette.primary.main,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{
                  color:
                    selectedIndex === item.id
                      ? theme.palette.selected.main
                      : theme.palette.primary.main,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </ThemeProvider>
    </div>
  );
}

const navbarContainer = css`
  position: flex;
  width: 100%;
  background-color: #eceff2;
  z-index: 1000;
  overflow-x: hidden; // 넘치는 컨텐츠를 가림
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
`;

const button = css`
  width: 60%;
  margin: 20px 0px;
`;
