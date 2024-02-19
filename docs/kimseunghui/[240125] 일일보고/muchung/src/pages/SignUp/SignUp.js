/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";
import logo from "./../../assets/logontext.png";

function PersonalInfo() {
  return (
    <div css={containerStyles}>
      <div>
        <img className="logo" src={logo} alt="" />
        <h1 className="header">입사지원</h1>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default PersonalInfo;

const containerStyles = css`
  height: 100vh;

  .logo {
    width: 20%;
  }
  .header {
    text-align: center;
    font-size: 40px;
    margin-bottom: 30px;
  }
`;
