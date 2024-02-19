import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "store/taskListSlice";

const AddTaskComponent = (onClose) => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim() !== "") {
      dispatch(addTask(task));
      onClose(); // 모달 닫기
    }

    return (
      <div>
        <h2>업무 등록</h2>
        <input
          type="text"
          placeholder="업무를 입력하세요"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>등록</button>
      </div>
    );
  };
};

export default AddTaskComponent;
