/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { CardActionArea, CardMedia } from "@mui/material";
import { BASE_URL } from "api/config";
import { Autocomplete, CardOverflow } from "@mui/joy";
import { ImageList } from "@mui/material";

const Report = () => {
  const [workList, setWorkList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const [taskList, setTaskList] = useState([]);
  // useEffect(() => {
  //   //서버랑 연결해서 데이터 가져오기
  //   axios.get(Base_URL + "/member").then((res) => {
  //     const { name, department } = res.data;
  //     setName(name);
  //     setDepartment(department);
  //   });
  // }, []);
  useEffect(() => {
    const getTaskList = async () => {
      try {
        // const res = await axios.get(BASE_URL + "/tasks/daily");
        const res = await axios.get(BASE_URL + "/tasks/daily");
        setTaskList(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTaskList();
  }, []);

  const getProfile = async () => {
    try {
      // const res = await axios.get(BASE_URL + "/member");
      const res = await axios.get(BASE_URL + "/member");
      const { name, department } = res.data;
      setName(name);
      setDepartment(department);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setWorkList([...workList, newTask]);
      setNewTask(""); // 작업 추가 후 입력 필드 지우기
      axios.post(BASE_URL + "/tasks", {
        task: newTask,
      });
    }
  };

  const handleDeleteTask = (index) => {
    const updatedWorkList = workList.filter((_, i) => i !== index);
    setWorkList(updatedWorkList);
    axios.delete(BASE_URL + "/tasks", {
      task: workList[index],
    });
  };

  const handleCancel = () => {
    setNewTask(""); // 입력 필드 지우기
  };

  const date = new Date().toLocaleDateString();

  return (
    <div css={container}>
      <div css={title}>업무 보고서</div>
      <div css={contentcontainer}>
        <div css={personal}>
          <div css={name}>
            <div css={p1}>이름</div>
            <div css={p2}>{name}1</div>
          </div>
          <div css={department}>
            <div css={p1}>소속</div>
            <div css={p2}>{department}1</div>
          </div>
          <div css={date}>
            <div css={p1}>작성일</div>
            <div css={p2}>{date}1</div>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <div css={worklist}>
            <ImageList rowHeight={160} cols={3}>
              {taskList.map((task, index) => (
                <Card key={index} sx={{ maxWidth: 345, margin: 2 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="auto"
                      image={
                        task.completionImage
                          ? task.completionImage
                          : "https://source.unsplash.com/random"
                      }
                      alt={`Task Image ${index}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {task.isCompleted ? "완료" : "미완료"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </ImageList>
          </div>
        </div>
      </div>

      <div>
        {workList.map((task, i) => (
          <div key={i}>
            {task}
            <span onClick={() => handleDeleteTask(i)}> 삭제</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <div onClick={handleAddTask}>등록</div>
      <div onClick={handleCancel}>취소</div>
      <div>제출하기</div>
    </div>
  );
};

export default Report;

// C8DEFF  93B4F3  5A83C8

const container = css`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-rows: 1fr 5fr 1fr;
  background-color: #c8deff;
  width: 100%;
  height: 100%;
`;

const title = css`
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  padding: 10%;
`;

const contentcontainer = css`
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  justify-content: center;
  align-items: center;
  background-color: #93b4f3;
  overflow-x: auto;
`;

const personal = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: #c8deff;
`;

const name = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  border-radius: 30%;
  background-color: #5a83c8;
  margin-right: 20%;
  height: 50%;
  align-items: center;
  justify-content: center;
`;

const p1 = css`
  grid-column: 1;
  background-color: #5a83c8;
`;
const p2 = css`
  grid-column: 2;
  background-color: #c8deff;
`;

const department = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  border-radius: 30%;
  background-color: #5a83c8;
  margin-right: 10%;
  margin-left: 10%;
  height: 50%;
  align-items: center;
  justify-content: center;
`;

const date = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  border-radius: 30%;
  background-color: #5a83c8;
  margin-left: 20%;
  height: 50%;
  align-items: center;
  justify-content: center;
`;

const worklist = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(1fr 1fr));
  overflow-x: auto; // 가로 스크롤이 필요한 경우 스크롤을 추가합니다.
  gap: 16px;
  justify-content: space-between; // 요소들을 좌우로 정렬합니다.
`;
