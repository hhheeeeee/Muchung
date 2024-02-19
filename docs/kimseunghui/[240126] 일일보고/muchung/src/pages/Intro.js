/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import logontext from "./../assets/logontext.png";

function Intro() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/signup/personalinfo");
  };

  const containerStyles = css`
    width: 100vw;
    display: flex;
    flex-direction: column;

    .headerStyles {
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid grey;
      height: 80px;
    }
  `;

  const logontextstyle = css`
    object-fit: contain;
  `;

  const contentStyles = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  const contentimg = css`
    width: 30%;
    background-color: rgb(222, 226, 252);
  `;
  return (
    <div css={containerStyles}>
      {/* <header css={headerStyles}> */}
      <header className="headerStyles">
        <img src={logontext} alt="" css={logontextstyle} />
      </header>
      <div css={contentStyles}>
        <div css={contentimg}>사진1</div>
        <div css={contentimg}>
          <p>무청컴퍼니에서</p>
          <p>신입사원을 모집합니다</p>
          <button onClick={handleNext}>지원하기</button>
        </div>
        <div css={contentimg}>사진2</div>
      </div>
    </div>
  );
}

export default Intro;
