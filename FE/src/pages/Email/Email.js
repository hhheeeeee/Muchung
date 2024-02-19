/* eslint-disable */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet, useNavigate } from "react-router-dom";
import EmailNavbar from "./EmailNavbar";
import Header from "pages/NewMainPage/header";
import BottomNav from "pages/NewMainPage/BottomNav";

const Email = () => {
  return (
    <>
      <div css={mainContainer}>
        <Header></Header>
        <div css={container1}>
          <Outlet />
        </div>
        <BottomNav></BottomNav>
      </div>
    </>
  );
};

export default Email;

const mainContainer = css`
  width: 100%;
  height: 100dvh;
  position: relative; /* 부모 요소의 position을 relative로 설정 */
`;

const container1 = css`
  /* background-color: #f7f7f7; */
  height: 90dvh;
  overflow: auto;
`;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  /* background-color: pink; */

  .content {
    width: 90%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu {
    width: 25%;
    height: 100%;
    background-color: #eceff2;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
  }

  .outlet {
    width: 100%;
    height: 100%;
  }
`;
