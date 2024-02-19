/* eslint-disable */

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import logo from "./../../assets/logo.png";
import logotext from "./../../assets/logotext.png";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "api/config";

function LogIn() {
  const navigate = useNavigate();
  const REST_API_KEY = "백엔드한테 달라하자1";
  const REDIRECT_URI = "백엔드한테 달라하자2";

  // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // const kakaoURL = `http://70.12.246.168:8080/oauth2/authorization/kakao`;

  // const handleLogin = () => {
  //   window.location.replace(kakaoURL);
  //   navigate("/main");
  // };
  const kakaoURL = `${BASE_URL}/oauth2/authorization/kakao`;

  const handleLogin = () => {
    window.location.href = `${BASE_URL_PORT}/auth/authorize/kakao?redirect_url=${frontendUrl}`;
  };

  return (
    <div css={containerStyle} className="container">
      <h2>Login</h2>
      <div css={cardStyle} className="card">
        <div css={logoAreaStyle} className="logo">
          <img src={logo} alt="" css={logoStyle} />
          <img src={logotext} alt="" css={logoStyle} />
        </div>
        <div css={inputAreaStyle} className="inputarea">
          <button onClick={handleLogin} css={buttonStyle}>
            카카오 로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(232, 234, 247);
  height: 100vh;
`;

const cardStyle = css`
  border-radius: 10px;
  width: 500px;
  height: 280px;
  display: flex;
  flex-direction: row;
  background-color: white;
  box-shadow: 5px 5px 5px gray;
`;

const logoAreaStyle = css`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const logoStyle = css`
  width: 150px;
`;

const inputAreaStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const inputStyle = css`
  margin: 8px;
  border-bottom: 1px solid grey;
`;

const labelStyle = css`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const buttonStyle = css`
  border: 0;
  margin: 10px;
  width: 150px;
  height: 35px;
  border-radius: 5px;

  &:hover {
    background-color: rgb(211, 211, 211);
  }
`;
