//캘린더 옆에 나오는 보고서 페이지

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";

// 임시로 데이터 추가
const name = "김무청";

const CalendarReport = () => {
  return (
    <>
      <div>
        <h1>일일보고</h1>
      </div>

      <div>
        {/* 로그인한 사용자 정보에서 가져올 예정 */}
        담당자 : {name}
      </div>

      <div>
        <div>업무 내용</div>
      </div>

      <div>
        <div>업무 후기</div>
      </div>

      <div></div>
    </>
  );
};

export default CalendarReport;
