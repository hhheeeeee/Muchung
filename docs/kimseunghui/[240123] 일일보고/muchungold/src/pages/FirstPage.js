/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import { css } from "@emotion/react";

function FirstPage() {
  const navigate = useNavigate();
  const goToIntro = () => {
    navigate("/intro");
  };
  const goToLogIn = () => {
    navigate("/LogIn");
  };

  return (
    <div css={Container}>
      <div css={Navbar}>
        <img src={logo} alt="logo" css={MyImg} />
        <h1>무업청년들</h1>
      </div>
      <div css={Content}>
        <p css={Ment}>둘 중 해당하는 곳을 선택해주세요</p>
        <div css={ButtonArea}>
          <button
            css={[
              Button,
              {
                background: "white",
                color: "rgb(63, 90, 138)",
                "&:hover": {
                  background: "rgb(244, 246, 255)",
                },
              },
            ]}
            onClick={goToLogIn}
          >
            사원
          </button>
          <button
            css={[
              Button,
              {
                background: "rgb(90, 131, 200)",
                color: "white",
                "&:hover": {
                  background: "rgb(80, 117, 178)",
                },
              },
            ]}
            onClick={goToIntro}
          >
            외부인
          </button>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;

let Container = css`
  background-color: rgb(232, 234, 247);
  height: 100vh;
`;

let Navbar = css`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

let MyImg = css`
  width: 90px;
`;

let Content = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

let Ment = css`
  font-size: 20px;
`;

let Button = css`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  margin: 0px 10px;
  font-size: 30px;
  font-weight: 800;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.02);
  }
`;

let ButtonArea = css`
  display: flex;
  flex-direction: row;
`;
