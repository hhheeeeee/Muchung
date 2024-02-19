/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Header from "./header";
import LeftNav from "./LeftNav";
import { Outlet } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Main = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
  };

  return (
    <>
      <div css={mainContainer}>
        {/* <div css={leftSideNavbar(isNavbarOpen)}>
          <LeftNav isNavbarOpen={isNavbarOpen ? "true" : "false"}></LeftNav>
          <PlayArrowIcon
            onClick={toggleNavbar}
            className="icon"
            sx={{ color: "#d3d3d3", fontSize: 70 }}
          ></PlayArrowIcon>
        </div> */}
        <div css={content}>
          <Header></Header>
          <div css={container}>
            <Outlet />
          </div>
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

  .navbar {
  }
`;

const content = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const container = css`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  /* display: grid;
  place-items: center;
  grid-template-rows: 1fr 2fr; */
  background-color: #f7f7f7;
  flex: 1; /* 남은 공간 모두 사용 */
  //margin: 2px; // 테두리를 위한 여백
  /* row-gap: 10px; */
`;

const leftSideNavbar = (isNavbarOpen) => css`
  width: ${isNavbarOpen ? "23%" : "5%"};
  border-right: 1px dashed #d3d3d3;
  height: 100%;
  cursor: pointer;
  transition: width 0.3s ease; // 애니메이션을 추가하여 부드럽게 접었다 폈다
  position: relative;
  position: sticky;

  .icon {
    position: absolute;
    top: 300px;
    right: -47px;
    z-index: 999;
  }
`;
