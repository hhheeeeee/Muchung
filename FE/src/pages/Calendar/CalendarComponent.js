// //캘린더 전체 페이지임 (캘린더 + 보고서 화면도 나옴)

// //response = { reports = { id, date, count}, }

// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
// import Navbar from "../../components/common/Navbar";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import { useState } from "react";
// import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
// import { useRef, useEffect } from "react";
// import CalendarReport from "./CalendarReport";

// // 임시로 해당 날짜에 작성한 보고서 내용 데이터 추가
// const reportData = [
//   { date: "2021-10-01", content: "오늘은 업무보고서를 작성했습니다." },
//   { date: "2021-10-02", content: "오늘은 업무보고서를 작성했습니다." },
//   { date: "2024-01-03", content: "오늘은 업무보고서를 작성했습니다." },
//   // 추가 데이터...
// ];
// const name = "김무청";

// function Calendar() {
//   const [view, setView] = useState("dayGridMonth");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [reportContent, setReportContent] = useState(null);

//   const events = [
//     { title: "Sample Event", date: new Date() },
//     // Add more events
//   ];

//   const isSubmissionDate = (date) => {
//     return true; // Placeholder, replace with your logic
//   };

//   const eventRender = (info) => {
//     const isSubmission = info.event && isSubmissionDate(info.event.start);

//     if (info.el) {
//       const classNames = isSubmission ? "submission" : "non-submission";
//       info.el.classList.add(classNames);
//     }
//   };

//   const getReportContent = (arg) => {
//     const date = arg.dateStr;
//     setSelectedDate(new Date(date));
//   };

//   const calendarRef = useRef(null);

//   useEffect(() => {
//     const initializeCalendar = async () => {
//       await new Promise((resolve) => {
//         window.addEventListener("load", resolve); // 스타일 로드를 기다리는 이벤트 리스너 추가
//       });

//       if (calendarRef.current) {
//         calendarRef.current.getApi().render();
//       }
//     };

//     initializeCalendar();
//   }, [calendarRef]);

//   useEffect(() => {
//     const fetchReportContent = async () => {
//       const report = reportData.find(
//         (item) => item.date === selectedDate.toISOString().split("T")[0]
//       );

//       if (report) {
//         setReportContent(report.content);
//       } else {
//         setReportContent(null);
//         alert("선택한 날짜에 보고서가 없습니다.");
//       }
//     };

//     if (selectedDate !== null) {
//       fetchReportContent();
//     }
//   }, [selectedDate]);

//   return (
//     <>
//       <div css={calendarbox}>
//         <div>{name} 님의 업무 일지</div>
//         {reportContent && selectedDate ? (
//           <div css={container}>
//             <FullCalendar
//               ref={calendarRef}
//               css={calendarView}
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView={view}
//               dateClick={getReportContent}
//               eventContent={eventRender}
//               events={events}
//               headerToolbar={{
//                 start: "dayGridMonth,timeGridWeek,timeGridDay",
//                 center: "title",
//                 display: "flex",
//                 // end: "custom2 prevYear,prev,next,nextYear",
//               }}
//             />

//             <div css={reportContainer}>
//               <CalendarReport />
//               {selectedDate && (
//                 <>
//                   <p>
//                     {selectedDate.toLocaleDateString()}에 작성한 보고서 내용
//                   </p>
//                   {reportContent && <p>{reportContent}</p>}
//                   <button onClick={() => setSelectedDate(null)}>
//                     보고서 닫기
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         ) : (
//           <>
//             <FullCalendar
//               ref={calendarRef}
//               css={calendarView}
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               initialView={view}
//               dateClick={getReportContent}
//               eventContent={eventRender}
//               events={events}
//               headerToolbar={{
//                 start: "dayGridMonth,timeGridWeek,timeGridDay",
//                 center: "title",
//                 display: "flex",
//                 // end: "custom2 prevYear,prev,next,nextYear",
//               }}
//             />
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default Calendar;

// const calendarbox = css`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
//   width: 100%;
// `;

// const container = css`
//   //   display: flex;
//   //   flex-direction: column;
//   //   align-items: center;
//   //   justify-content: space-between;
//   // height: 100vh;
//   display: grid;
//   grid-template-columns: 1fr 1fr; /* 두 개의 열로 나눔 */
//   /* gap: 20px; 열 간격 조절 */
// `;

// const calendarView = css`
//   grid-column: 1; /* 첫 번째 열에 배치 */
//   display: flex;
//   // width: 100%;
// `;

// const reportContainer = css`
//   // width: 50%;
//   // float: right;
//   grid-column: 2; /* 두 번째 열에 배치 */
//   display: flex;
//   // padding: 20px;
//   box-sizing: border-box;
// `;
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarComponent = () => {
  const handleCustomButtonClick = (buttonNumber) => {
    // Handle your custom button click logic
    console.log(`Custom button ${buttonNumber} clicked`);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      timeZone="UTC"
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      height={600}
      headerToolbar={{
        start: "dayGridMonth,timeGridWeek,timeGridDay custom1",
        center: "title",
        end: "custom2 prevYear,prev,next,nextYear",
      }}
      customButtons={{
        custom1: {
          text: "custom 1",
          click: () => handleCustomButtonClick(1),
        },
        custom2: {
          text: "custom 2",
          click: () => handleCustomButtonClick(2),
        },
      }}
    />
  );
};

export default CalendarComponent;
