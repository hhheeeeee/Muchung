/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Todolist from 'components/common/Todolist';
import { BASE_URL } from 'api/config';
import { useDispatch } from 'react-redux';

import { useState } from 'react';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { set } from 'date-fns';

//날짜 데이터 받아서 캘린더에 표시
// 이벤트 클릭시 해당 날짜의 보고서를 표시

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(true); // 전체 화면 여부에 따라 동적으로 변경

  const [todayTodo, setTodayTodo] = useState([]); //오늘의 할일

  const dispatch = useDispatch();

  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const calendarRef = useRef(null);

  const accessToken = localStorage.getItem('token');

  function monthStringToNumber(monthString) {
    const monthMap = {
      jan: 1,
      feb: 2,
      mar: 3,
      apr: 4,
      may: 5,
      jun: 6,
      jul: 7,
      aug: 8,
      sep: 9,
      oct: 10,
      nov: 11,
      dec: 12,
    };

    const lowercaseMonthString = monthString ? monthString.toLowerCase() : '';
    return monthMap[lowercaseMonthString] || 0;
  }

  const today =
    new Date().getFullYear() +
    '-' +
    `${new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)}` +
    '-' +
    new Date().getDate();
  console.log(today);

  useEffect(() => {
    if (accessToken === 'null') {
      return;
    }
    // 처음 렌더링될 때의 연 월 정보를 얻어와서 상태에 저장합니다.
    const initialDate = calendarRef.current.getApi().view.title;
    // const month = initialDate.substr(0, 3);
    setCurrentMonth(initialDate.substr(0, 3));
    setCurrentYear(initialDate.substr(4, 4));
    // 현재 보이는 캘린더의 월에 해당하는 데이터를 서버에서 받아옵니다.
    const fetchdateData = async () => {
      try {
        const reportdateres = await axios.get(`${BASE_URL}/reports/monthly`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            month: monthStringToNumber(currentMonth),
            year: currentYear,
          },
        });
        const reportdates = reportdateres.data;

        // reportDates를 FullCalendar 이벤트로 형식화
        const formattedEvents = reportdates.map((date) => ({
          title: 'Report',
          start: date.date, // date가 FullCalendar에서 인식 가능한 유효한 형식이라고 가정합니다.
          // 서버 응답에 따라 날짜 형식을 조절해야 할 수 있습니다.
        }));

        // FullCalendar의 이벤트를 설정합니다.
        const todayres = await axios.get(`${BASE_URL}/tasks/daily`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const todaytasks = todayres.data;
        console.log(todaytasks);
        setTodayTodo(todaytasks);
        const todayFormattedEvents = [
          {
            title: 'Report',
            start: today,
          },
        ];

        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
          calendarApi.removeAllEvents();
          calendarApi.addEventSource(formattedEvents);
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      }
    };
    fetchdateData();
  }, [dispatch, currentMonth, currentYear]);

  const container = css`
    display: grid;
    grid-template-rows: ${isFullscreen ? '1fr minmax(0, 1fr)' : '5fr 5fr'};
    width: 100%;
    height: 100%;
  `;
  const report = css`
    grid-row: 2; // 두 번째 행에 배치
    height: ${isFullscreen ? '0' : '100%'}; /* 전체 화면 여부에 따라 높이를 동적으로 변경 */
    opacity: ${isFullscreen ? 0 : 1};
    visibility: ${isFullscreen ? 'hidden' : 'visible'};
    transform: translateY(${isFullscreen ? '100%' : '0'}); /* 이동 효과 추가 */
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out; /* 트랜지션 효과 추가 */
    justify-content: center;
    align-items: center;
    /* border: 1px solid black; 테두리 추가 */
    background-color: #d2e8ff;
  `;
  const views = {
    dayGrid: {
      titleFormat: { month: 'short', year: 'numeric' },
    },
    timeGrid: {
      titleFormat: { month: 'short', day: 'numeric' },
    },
    week: {
      titleFormat: { month: 'short', day: 'numeric' },
    },
    day: {},
  };
  return (
    <div css={container}>
      <div css={calendar}>
        <div css={calendarStyles}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            timeZone="Asia/Seoul"
            aspectRatio="1.5" // 가로 세로 비율을 1.5로 설정
            contentHeight="auto"
            height="auto"
            // height={isFullscreen ? "900px" : "400px"} // 화면 전체 높이로 설정
            scrollTime={false} // 시간 축에 스크롤을 사용하지 않도록 설정
            views={views} // views 속성 추가
            editable={true}
            selectable={true}
            headerToolbar={{
              start: 'title',
              end: 'dayGridMonth,timeGridWeek,timeGridDay,today,prev,next',
              color: 'black',
            }}
            buttonText={{
              today: '오늘',
              month: '월',
              week: '주',
              day: '일',
            }}
            eventColor="light-blue"
            events={
              [
                // {
                //   title: "안녕하..",
                //   start: "2024-02-01",
                // },
              ]
            }
            eventClick={function (info) {
              const date = info.event.start;

              // JavaScript의 Date 객체를 사용하여 날짜 형식을 변환
              const formattedDate = new Date(date);

              // 원하는 날짜 포맷으로 변환
              const year = formattedDate.getFullYear();
              const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
              const day = formattedDate.getDate().toString().padStart(2, '0');

              const formattedDateString = year + '-' + month + '-' + day;

              setSelectedDate(formattedDateString);
              setIsFullscreen(false);
            }}
            ref={calendarRef}
          />
        </div>
      </div>

      <div css={report}>
        <Todolist selectedDate={selectedDate} />
      </div>
    </div>
  );
};

const calendar = css`
  grid-row: 1; //첫 번째 행에 배치
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
`;

// #d2e8ff
// #6fbbff, #e8f0f9, #83a8ff

const calendarStyles = css`
  .fc {
    background-color: white;
  }
  .fc-button {
    background-color: #d2e8ff;
  }

  // toolbar container
  .fc .fc-toolbar.fc-header-toolbar {
    background-color: #83a8ff;
    color: white;
  }

  // 오늘 날짜 배경색
  .fc .fc-daygrid-day.fc-day-today {
    background-color: #7cafd7;
    color: #356eff;
  }
  // 날짜별 그리드
  .fc .fc-daygrid-day-frame {
    border: 1px solid #83a8ff;
  }
`;

export default Calendar;
