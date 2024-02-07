/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

const TrashEmail = () => {
  return <div css={container}>쓰레기메일~</div>;
};

export default TrashEmail;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: pink;
`;
