/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import logo from "./../assets/logo.png";
import logotext from "./../assets/logotext.png";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/main");
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
          <label htmlFor="id" css={labelStyle}>
            id :
            <input
              type="text"
              placeholder="사번을 입력해주세요."
              css={inputStyle}
            />
          </label>
          <label htmlFor="password" css={labelStyle}>
            pw :
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              css={inputStyle}
            />
          </label>
          <button onClick={handleLogin} css={buttonStyle}>
            회사 입장하기
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
