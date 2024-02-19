import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "api/config";

const initialState = [];
const accessToken = localStorage.getItem("accessToken");

// 비동기 액션 생성자 함수
export const fetchTaskList = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks/daily`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(setTaskList(response.data)); // 액션 디스패치
  } catch (error) {
    console.error("Error fetching task list:", error);
  }
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState: initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      // 특정 페이로드를 가진 작업을 제거하기 위해 filter를 사용
      return state.filter((task) => task.id !== action.payload);
    },
    setTaskList: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTask, deleteTask, setTaskList } = taskListSlice.actions;

export default taskListSlice.reducer;
