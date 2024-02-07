/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

const SentEmail = () => {
  return <div css={container}>보낸메일</div>;
};

export default SentEmail;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: pink;
`;
