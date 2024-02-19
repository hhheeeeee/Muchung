import { useNavigate } from "react-router-dom";
import "./../styles/FirstPage.css";
import logo from "./../assets/logo.png";

function FirstPage() {
  const navigate = useNavigate();
  const goToIntro = () => {
    navigate("/intro");
  };
  const goToLogIn = () => {
    navigate("/LogIn");
  };
  return (
    <div className="container">
      <header className="navbar">
        <img src={logo} alt="logo" />
        <h1>무업청년들</h1>
      </header>
      <div className="content">
        <p className="choose">둘 중 해당하는 곳을 선택해주세요</p>
        <div>
          <button className="btn member" onClick={goToLogIn}>
            사원
          </button>
          <button className="btn notmember" onClick={goToIntro}>
            외부인
          </button>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
