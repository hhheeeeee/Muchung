/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

const RecievedEmail = () => {
  return <div css={container}>받은거~</div>;
};

export default RecievedEmail;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: pink;
`;
