import { useNavigate } from "react-router-dom";
import "./../styles/LogIn.css";
import logo from "./../assets/logo.png";
import logotext from "./../assets/logotext.png";

function LogIn() {
  return (
    <div className="container">
      <h2>Login</h2>
      <div className="card">
        <div className="logo">
          <img src={logo} alt="" />
          <img src={logotext} alt="" />
        </div>
        <div className="inputarea">
          <label for="id">
            id :
            <input type="text" placeholder="사번을 입력해주세요." id="id" />
          </label>
          <label for="password">
            pw :
            <input
              type="text"
              placeholder="비밀번호를 입력해주세요."
              id="password"
            />
          </label>
          <button>회사 입장하기</button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
