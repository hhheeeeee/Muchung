/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CalendarCom from "pages/Calendar/CalendarCom";
import MainReport from "pages/Report/MainReport";
import Maingraph from "pages/graph/Maingraph";
import RecWorklist from "../../components/common/RecWorklist";

import Commute from "./Commute";
import Todolist from "components/common/Todolist";
const Dashboard = () => {
  return (
    <div css={container}>
      <div css={uppersection}>
        <div css={profile}>
          <Commute />
        </div>
        <div css={recommend}>
          <RecWorklist />
        </div>
        <div css={graph}>
          <Maingraph />
        </div>
      </div>
      <div css={lowersection}>
        <div css={calendar}>
          <CalendarCom />
        </div>
        <div css={todolist}>
          {/* <MainReport /> */}
          <Todolist />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const container = css`
  display: flex;
  /* flex-direction: column;
  align-items: center;
  justify-content: center; */
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  grid-template-rows: 4fr 5fr;
  flex: 1;
`;

const uppersection = css`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 90%;
  height: 90%;
  column-gap: 30px; // 열 사이의 간격
`;

const profile = css`
  grid-column: 1; // 1번째 열에 위치
  display: flex;
  align-items: center;
  border-radius: 30px;
`;

const recommend = css`
  grid-column: 2; // 2번째 열에 위치
  display: flex;
  align-items: center;
  /* margin: 8px; // 테두리를 위한 여백 */
  border-radius: 20px;
  background-color: white;
`;

const graph = css`
  grid-column: 3; // 3번째 열에 위치
  display: flex;
  align-items: center;
  /* margin: 8px; // 테두리를 위한 여백 */
  border-radius: 20px;
  background-color: white;
`;

const lowersection = css`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 90%;
  column-gap: 30px;
  height: 95%;
`;

const calendar = css`
  grid-column: 1; // 1번째 열에 위치
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 8px; // 테두리를 위한 여백 */
  border-radius: 20px;
  background-color: white;
`;

const todolist = css`
  grid-column: 2; // 2번째 열에 위치
  display: flex;
  align-items: center;
  /* margin: 8px; // 테두리를 위한 여백 */
  border-radius: 20px;
  background-color: white;
`;

const leftSideNavbar = (isNavbarOpen) => css`
  /* background-color: yellow; */
  width: ${isNavbarOpen ? "23%" : "5%"};
  border-right: 1px dashed #d3d3d3;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: width 0.3s ease; // 애니메이션을 추가하여 부드럽게 접었다 폈다
`;

const rightSideNavbar = css`
  /* background-color: white; */
  border-left: 1px solid #d3d3d3;
  width: 3%;
  height: 100%;
  /* cursor: pointer; */
`;
