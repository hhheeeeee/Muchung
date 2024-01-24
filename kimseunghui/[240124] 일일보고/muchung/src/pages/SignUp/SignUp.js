/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { Outlet } from "react-router-dom";

function PersonalInfo() {
  return (
    <div css={containerStyles}>
      <div>
        <h1 className="header">입사지원</h1>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default PersonalInfo;

const containerStyles = css`
  height: 100vh;

  .header {
    text-align: center;
    font-size: 40px;
    margin: 50px 0px;
  }
`;
