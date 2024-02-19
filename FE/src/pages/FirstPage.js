/* eslint-disable */
/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import { css } from "@emotion/react";
import logontext from "assets/logontext.png";
import { BASE_URL_PORT } from "api/config";

function FirstPage() {
  const navigate = useNavigate();

  const goToIntro = () => {
    navigate("/intro");
  };
  const goToLogIn = () => {
    navigate("/LogIn");
  };

  const gotoCommute = () => {
    navigate("/commute");
  };

  const goToSignup = () => {
    navigate("/signup/personalinfo");
  };

  const frontendUrl = window.location.protocol + "//" + window.location.host;

  const handleLogin = () => {
    // window.location.href = kakaoURL;
    window.location.href = `${BASE_URL_PORT}/auth/authorize/kakao?redirect_url=${frontendUrl}`;
  };

  return (
    <>
      <div css={mobilecontainer}>
        <div className="logo">
          <img className="logoimg" src={logontext} alt="" />
        </div>
        <div className="auth">
          <button onClick={handleLogin} className="btn signup">
            입사하기
          </button>
          <button onClick={handleLogin} className="btn login">
            카카오 로그인
          </button>
        </div>
      </div>
    </>
  );
}

export default FirstPage;

const mobilecontainer = css`
  background-color: #dff5fd;
  height: 100dvh;

  .logo {
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logoimg {
    object-fit: contain;
    width: 100%;
  }

  .auth {
    height: 18%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .btn {
    width: 80%;
    height: 40%;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 600;
  }

  .signup {
    background-color: white;
    color: #2d6292;
    border: 3px solid #2d6292;

    :hover {
      background-color: rgb(247, 247, 247);
    }
  }

  .login {
    background-color: #2d6292;
    color: white;
    border: 3px solid white;

    :hover {
      background-color: rgb(41, 92, 137);
    }
  }
`;

let Container = css`
  background-color: rgb(232, 234, 247);
  height: 100vh;
`;

let headerstyle = css`
  font-size: 40px;
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
  margin: 30px 0px;
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
