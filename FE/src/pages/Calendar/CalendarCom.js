/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "api/config";

import Report from "pages/Report/Report";
import Newcal from "./Newcal";
import { set } from "date-fns";
import { useSelector } from "react-redux";
import { setToken } from "store/tokenSlice";
import { useDispatch } from "react-redux";

//서버에서 현재 로그인한 유저의 아이디를 바탕으로 해당 유저의 투두리스트 데이터를 모두 가져옴
//그 투두리스트 데이터를 바탕으로 투두리스트를 제출한 날짜를 모두 가져옴
//투두리스트를 제출한 날짜를 바탕으로 캘린더에 표시함
//투두리스트를 제출한 날짜를 클릭하면 그 날짜에 해당하는 투두리스트를 가져와서 표시함
//투두리스트가 없는 날짜를 클릭하면 "해당 날짜에는 투두리스트가 없습니다"라는 메시지를 표시함

function CalendarCom() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.token);
  const [userData, setUserData] = useState(null); //현재 로그인한 유저의 정보
  const [taskList, setTaskList] = useState([]); //투두리스트 데이터를 담을 배열
  const [dateList, setDateList] = useState([]); //투두리스트를 제출한 날짜들을 담을 배열
  const [selectedDate, setSelectedDate] = useState(null); //선택한 날짜

  //서버에서 현재 로그인한 유저의 토큰으로 해당 유저의 투두리스트 데이터를 모두 가져옴
  //그 투두리스트 데이터를 바탕으로 투두리스트를 제출한 날짜를 모두 가져옴

  useEffect(() => {
    const getinfoList = async () => {
      try {
        //임시 토큰
        const tokenres = await axios.get(`${BASE_URL}/token`);
        const tokens = tokenres.data;
        dispatch(setToken(tokens));

        //userData에 현재 로그인한 유저의 정보가 담겨있음
        const userres = await axios.get(
          `${BASE_URL}/member/memberInformation`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const user = userres.data;
        setUserData(user);
        // console.log(userData.data.name);

        //서버에서 현재 로그인한 유저의 토큰으로 해당 유저의 투두리스트 데이터를 모두 가져옴
        const taskres = await axios.get(BASE_URL + "/tasks/daily", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const tasks = taskres.data;
        setTaskList(tasks);

        //서버에서 투두리스트id 로 투두리스트를 제출한 날짜를 모두 가져옴
        const dateres = await axios.get(BASE_URL + "/tasks/" + tasks.id, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const dates = dateres.data;
        setDateList(dates);
      } catch (error) {
        console.error(error);
      }
    };

    getinfoList();
  }, []);

  return <div></div>;
}

export default CalendarCom;

const container = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  background-image: url("src/assets/backfileimg.PNG");
  background-size: cover; /* 이미지를 화면에 맞게 조절 */
  background-position: center; /* 이미지를 가운데 정렬 */
`;

const calendar = css`
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const todolist = css`
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;
