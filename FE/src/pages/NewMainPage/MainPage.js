/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./header";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <div css={mainContainer}>
        <Header></Header>
        <div css={container}>
          <Outlet />
        </div>
        <BottomNav></BottomNav>
      </div>
    </>
  );
};

const mainContainer = css`
  width: 100%;
  height: 100dvh;
  position: relative; /* 부모 요소의 position을 relative로 설정 */
  background-color: white;
`;

const container = css`
  /* background-color: #f7f7f7; */
  height: 85dvh;
  overflow: auto;
`;

export default Main;
