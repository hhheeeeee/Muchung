/* eslint-disable */
/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import img from "assets/pagenotfound.gif";

function PageNotFound() {
  const navigate = useNavigate();

  const handlebtn = function () {
    navigate("/");
  };
  return (
    <>
      <div css={container}>
        <p className="title">페이지를 찾을 수 없습니다</p>
        <img src={img} alt="404" />
        <button className="btn" onClick={handlebtn}>
          HOME
        </button>
      </div>
    </>
  );
}

export default PageNotFound;

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fcfcff;

  .title {
    font-weight: 600;
    font-size: 2rem;
    margin: 2rem 0rem;
  }

  .btn {
    padding: 10px 20px;
    background-color: rgb(48, 141, 229);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
  }

  .btn:hover {
    background-color: #1976d2;
  }
`;
