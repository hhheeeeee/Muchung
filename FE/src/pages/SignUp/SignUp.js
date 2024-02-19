/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";
import logo from "./../../assets/logontext.png";

function Signup() {
  return (
    <>
      <div css={mobilecontainer}>
        <h1 className="header">무업청년들 채용 프로세스💡📝</h1>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default Signup;

const mobilecontainer = css`
  background-color: white;
  height: 100dvh;
  .header {
    height: 10%;
    font-size: 1.5rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 1rem;
  }
`;

const containerStyles = css`
  height: 100vh;

  .logo {
    width: 20%;
  }
  .header {
    text-align: center;
    font-size: 40px;
    margin-bottom: 40px;
  }
`;
