/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import axios from "axios";
import SubmitComponent from "./SubmitComponent";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

// 예시 데이터
const workList = [
  { check: "완수", create: "성공", delete: "삭제" },
  { check: "미완수", create: "지연", delete: "삭제" },
  { check: "미완수", create: "지연", delete: "삭제" },
];

const TodoList = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [workList, setWorkList] = React.useState([]);

  React.useEffect(() => {
    // axios를 이용하여 데이터를 받아옴
    axios
      .get("your_api_endpoint")
      .then((response) => {
        // 받아온 데이터를 기반으로 workList 업데이트
        setWorkList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // 빈 배열을 넣어 한 번만 호출되도록 설정

  const handleAddTask = (task) => {
    // task를 workList에 추가
    setWorkList([...workList, task]);
  };

  return (
    <div css={container}>
      <Grid item xs={12} md={6}>
        <Demo>
          <List dense={dense}>
            {workList.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <div>
                    <IconButton edge="end" aria-label="delete">
                      <AddAPhotoIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    {secondary ? (
                      <CheckBoxIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  workList={workList}
                  primary={item.check}
                  secondary={secondary ? item.create : null}
                />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
      <SubmitComponent onAddTask={handleAddTask} />
    </div>
  );
};

export default TodoList;

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  border-radius: 10px;
`;
