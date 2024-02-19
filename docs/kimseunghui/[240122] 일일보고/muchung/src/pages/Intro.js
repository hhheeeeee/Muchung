import { useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import logotext from "./../assets/logotext.png";
import "./../styles/Intro.css";

function Intro() {
  const navigate = useNavigate();
  const goToSign = () => {
    navigate("/signup");
  };
  return (
    <div class="container">
      <header class="header">
        <img src={logotext} alt="" />
        <img src={logo} alt="" />
      </header>
      <div className="container">
        <img src={logotext} alt="" />
        <p>영입 프로세스</p>
        <button onClick={goToSign}>지원하기</button>
      </div>
    </div>
  );
}

export default Intro;
