/** @jsxImportSource @emotion/react */
import Navbar from "../../components/common/Navbar";
import IDcard from "../../components/common/IDcard";
// import Todolist from "../../components/common/Todolist";
import Broadcast from "../../components/common/Broadcast";
import GrassBox from "../../components/development/GrassBox";

import { css } from "@emotion/react";

// 여기는 메인페이지입니다.
function MainPage() {
  return (
    <div css={container}>
      <Navbar></Navbar>
      <div className="content">
        <div className="box upper">
          <IDcard></IDcard>
          {/* <Todolist></Todolist> */}
          <Broadcast></Broadcast>
        </div>
        <div className="box lower">
          <GrassBox></GrassBox>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

const container = css`
  background-color: rgb(232, 234, 247);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border: 1px solid black; */
  }

  .box {
    width: 90%;
    height: 40vh;
    background-color: white;
    border-radius: 10px;
    margin: 10px 0px;
    display: flex;
    justify-content: center;
  }
`;
