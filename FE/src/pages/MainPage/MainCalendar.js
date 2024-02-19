import { css } from "@emotion/react";
import { useState } from "react";

import CalendarComponent from "pages/Calendar/CalendarComponent";
import Calendar from "pages/Calendar/CalendarCom";
import Newcal from "pages/Calendar/Newcal";

const MainCalendar = () => {
  const [showReport, setShowReport] = useState(false);

  const handleDateClick = () => {
    // 날짜 클릭 시 보고서 컴포넌트를 표시합니다.
    setShowReport(true);
  };

  return (
    <div css={container}>
      <div css={calendarContainer}>
        <Newcal />
      </div>

      {showReport && <div css={reportContainer}>보고서 컴포넌트임</div>}
    </div>
  );
};

export default MainCalendar;

const container = css`
  display: grid;
  grid-template-rows: 3fr 2fr;
  gap: 4px; // grid 사이의 간격
  background-color: #f7f7f7;
  height: 100vh; // 화면 전체 높이
`;

const calendarContainer = css`
  grid-row: 1; // 첫 번째 행에 배치
  /* overflow: hidden; // 날짜 클릭 시 캘린더 컴포넌트를 숨기기 위해 overflow 속성 추가 */
`;

const reportContainer = css`
  grid-row: 2; // 두 번째 행에 배치
  background-color: #ffffff;
  padding: 16px;
`;

// CalendarComponent에서 onDateClick 콜백을 전달하여 날짜를 클릭할 때 MainCalendar에서 처리할 수 있도록 합니다.
