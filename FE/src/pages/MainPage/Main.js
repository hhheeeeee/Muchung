/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import CalendarCom from "pages/Calendar/CalendarCom";
import Report from "pages/Report/Report";
import Maingraph from "pages/graph/Maingraph";

const Main = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
  };

  return (
    <>
      <div css={mainContainer}>
        <div css={leftSideNavbar(isNavbarOpen)} onClick={toggleNavbar}>
          <div>leftSideNavbar</div>
        </div>

        <div css={container}>
          <div css={uppersection}>
            <div css={profile}>user profile</div>
            <div css={recommend}>recommended worklist</div>
            <div css={graph}>
              <Maingraph />
            </div>
          </div>
          <div css={lowersection}>
            <div css={calendar}>
              <CalendarCom />
            </div>
            <div css={todolist}>
              <Report />
            </div>
          </div>
        </div>

        <div css={rightSideNavbar}>
          <div>rightSideNavbar</div>
        </div>
      </div>
    </>
  );
};

export default Main;

const mainContainer = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh; // 전체 화면 사용
`;

const container = css`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  display: grid;
  grid-template-rows: 1fr 2fr;
  background-color: rgb(249, 250, 251);
  flex: 1; /* 남은 공간 모두 사용 */
  //margin: 2px; // 테두리를 위한 여백
`;

const uppersection = css`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
`;

const profile = css`
  grid-column: 1; // 1번째 열에 위치
  display: flex;
  align-items: center;
  margin: 8px; // 테두리를 위한 여백
  border-radius: 20px;
  background-color: white;
`;

const recommend = css`
  grid-column: 2; // 2번째 열에 위치
  display: flex;
  align-items: center;
  margin: 8px; // 테두리를 위한 여백
  border-radius: 20px;
  background-color: white;
`;

const graph = css`
  grid-column: 3; // 3번째 열에 위치
  display: flex;
  align-items: center;
  margin: 8px; // 테두리를 위한 여백
  border-radius: 20px;
  background-color: white;
`;

const lowersection = css`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const calendar = css`
  grid-column: 1; // 1번째 열에 위치
  display: flex;
  align-items: center;
  margin: 8px; // 테두리를 위한 여백
  border-radius: 20px;
  background-color: white;
`;

const todolist = css`
  grid-column: 2; // 2번째 열에 위치
  display: flex;
  align-items: center;
  margin: 8px; // 테두리를 위한 여백
  border-radius: 20px;
  background-color: white;
`;

const leftSideNavbar = (isNavbarOpen) => css`
  /* background-color: yellow; */
  width: ${isNavbarOpen ? "15%" : "5%"};
  border-right: 1px solid #d3d3d3;
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
