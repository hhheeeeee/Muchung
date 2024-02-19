// import * as React from "react";
// import dayjs from "dayjs";
// import Badge from "@mui/material/Badge";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { PickersDay } from "@mui/x-date-pickers/PickersDay";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
// import axios from "axios";
// import { Base_URL } from "api/config";
// import { useEffect, useState } from "react";

// const ServerDay = (props) => {
//   const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

//   const isSelected =
//     !outsideCurrentMonth && highlightedDays.includes(day.date());

//   return (
//     <Badge
//       key={day.toString()}
//       overlap="circular"
//       badgeContent={isSelected ? "🌚" : undefined}
//     >
//       <PickersDay
//         {...other}
//         outsideCurrentMonth={outsideCurrentMonth}
//         day={day}
//       />
//     </Badge>
//   );
// };

// const Newcal = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [highlightedDays, setHighlightedDays] = useState([]);
//   const [taskList, setTaskList] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(dayjs());

//   useEffect(() => {
//     const fetchHighlightedDays = async () => {
//       try {
//         const res = await axios.get(Base_URL + "/tasks/daily");
//         setTaskList(res.data);
//         setHighlightedDays(res.data.map((task) => dayjs(task.date).date()));
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchHighlightedDays();
//   }, [selectedDate]);

//   const handleMonthChange = (date) => {
//     setIsLoading(true);
//     setHighlightedDays([]);

//     // month 변경시 selectedDate 업데이트
//     setSelectedDate(date);
//   };

//   return (
//     <div css={container}>
//       <div className="calendar">
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateCalendar
//             loading={isLoading}
//             onMonthChange={handleMonthChange}
//             renderLoading={() => <DayCalendarSkeleton />}
//             slots={{
//               day: ServerDay,
//             }}
//             slotProps={{
//               day: {
//                 highlightedDays,
//               },
//             }}
//           />
//         </LocalizationProvider>
//       </div>
//       <div className="report">
//           report
//       </div>
//     </div>
//   );
// };

// export default Newcal;

// const container = css`
// display : flex;
// flex-direction : row;
// width : 100%;
// height : 100%;

// .calendar {
//   flex : 1;
//   padding : 16px;
// }

// .report {

//   padding : 16px;
// }
// `;

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import axios from "axios";
import { BASE_URL } from "api/config";
import { css } from "@emotion/react";

const ServerDay = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.includes(day.date());

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};

const Newcal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchHighlightedDays = async () => {
      try {
        const res = await axios.get(BASE_URL + "/tasks/daily");
        setTaskList(res.data);
        setHighlightedDays(res.data.map((task) => dayjs(task.date).date()));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHighlightedDays();
  }, [selectedDate]);

  const handleMonthChange = (date) => {
    setIsLoading(true);
    setHighlightedDays([]);
    setSelectedReport(null); // 월 변경시 선택된 보고서 초기화

    setSelectedDate(date);
  };

  const handleDateClick = (date) => {
    const selectedTask = taskList.find(
      (task) => dayjs(task.date).date() === date
    );
    setSelectedReport(selectedTask ? selectedTask.report : null);
  };

  return (
    <div css={container}>
      <div className="calendar">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            loading={isLoading}
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            onDateClick={handleDateClick}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
          />
        </LocalizationProvider>
      </div>
      {/* <div className="report">
        {selectedReport ? (
          <div>
            <h2>{selectedDate.format("YYYY년 MM월 DD일")}의 보고서</h2>
            <p>{selectedReport}</p>
          </div>
        ) : (
          <p>선택된 보고서가 없습니다.</p>
        )}
      </div> */}
    </div>
  );
};

export default Newcal;

const container = css`
  display: flex;
  width: 100%;
  height: 100%;

  /* .calendar {
    flex: 1;
    padding: 16px;
  }

  .report {
    flex: 1;
    padding: 16px;
    border-left: 1px solid #ccc;
    box-sizing: border-box;
  } */
`;
