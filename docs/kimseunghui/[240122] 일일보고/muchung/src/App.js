import FirstPage from "./pages/FirstPage";
import Intro from "./pages/Intro";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        {/* 처음 진입 페이지 */}
        <Route path="/" element={<FirstPage />} />
        {/* 회사 소개 페이지 */}
        <Route path="/intro" element={<Intro />} />
        {/* <SignIn /> */}
        <Route path="/signup" element={<SignUp />} />
        {/* <LogIn /> */}
        <Route path="/login" element={<LogIn />} />

        <Route path="*" element={<div>없는페이지임</div>} />
      </Routes>
    </div>
  );
}

export default App;
