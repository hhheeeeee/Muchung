import FirstPage from "./pages/FirstPage";
import Intro from "./pages/Intro";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import PersonalInfo from "./pages/SignUp/PersonalInfo";
import Interview from "./pages/SignUp/Interview";
import NcsIntro from "./pages/SignUp/NcsIntro";
import Ncs from "./pages/SignUp/Ncs";
import SignUpFinal from "./pages/SignUp/SignUpFinal";
import MainPage from "./pages/MainPage/MainPage";
import MailBox from "./pages/MailPage/MailBox";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Global } from "@emotion/react";
import { globalStyle } from "./themes/reset";

function App() {
  return (
    <Router>
      <Global styles={globalStyle} />
      <Routes>
        {/* 처음 진입 페이지 */}
        <Route path="/" element={<FirstPage />} />
        {/* 회사 소개 페이지 */}
        <Route path="/intro" element={<Intro />} />
        {/* 회원가입 */}
        <Route path="/signup" element={<SignUp />}>
          <Route path="personalinfo" element={<PersonalInfo />} />
          <Route path="interview" element={<Interview />} />
          <Route path="ncsintro" element={<NcsIntro />} />
          <Route path="ncs" element={<Ncs />} />
          <Route path="final" element={<SignUpFinal />} />
        </Route>
        {/* <LogIn /> */}
        <Route path="/login" element={<LogIn />} />
        {/* 메인페이지 */}
        <Route path="/main" element={<MainPage />} />

        {/* 메일 페이지 */}
        <Route path="/mail" element={<MailBox />} />
        

        <Route path="*" element={<div>없는페이지임</div>} />
      </Routes>
    </Router>
  );
}

export default App;
