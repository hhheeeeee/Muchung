/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "store/taskListSlice";

const SubmitComponent = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);

  const handleAddTask = () => {
    dispatch(addTask(task));

    axios
      .post("http://localhost:8080/api/v1/task", {
        task: task,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  const handleCancelTask = () => {
    console.log("취소");
  };

  return (
    <div>
      <form css={subscribeForm}>
        <input
          css={subscribeInput}
          placeholder="할 일 등록"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button css={subscribeBtn} onClick={handleAddTask}>
          등록
        </button>
        <button css={cancelbutton} onClick={handleCancelTask}>
          취소
        </button>
      </form>
    </div>
  );
};

// Emotion CSS Styles
const subscribeForm = css`
  --main-focus: #000;
  --font-color: #000;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  flex-direction: row;
  width: 250px;
  height: 100%;
  border-radius: 5px;
  box-shadow: 4px 4px var(--main-color);
`;

const subscribeInput = css`
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  border: 2px solid var(--main-color);
  border-right: 0;
  border-radius: 5px 0 0 5px;
  font-size: 15px;
  font-weight: 500;
  color: var(--font-color);
  background: var(--bg-color);
`;

const subscribeBtn = css`
  width: 100px;
  height: 100%;
  border: 2px solid var(--main-focus);
  // border-radius: 0 5px 5px 0;
  background-color: #000;
  font-size: 15px;
  letter-spacing: 1px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
`;
const cancelbutton = css`
  width: 100px;
  height: 100%;
  border: 2px solid var(--main-focus);
  border-radius: 0 5px 5px 0;
  background-color: #fefefe;
  font-size: 15px;
  letter-spacing: 1px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
`;

export default SubmitComponent;
