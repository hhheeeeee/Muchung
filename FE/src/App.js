import Intro from "./pages/Intro/Intro";
import LogIn from "./pages/Login/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import PersonalInfo from "./pages/SignUp/PersonalInfo";
import Interview from "./pages/SignUp/Interview";
import NcsIntro from "./pages/SignUp/NcsIntro";
import Ncs from "./pages/SignUp/Ncs";
import SignUpFinal from "./pages/SignUp/SignUpFinal";
import DailyReport from "pages/Report/DailyReport";
import Feeds from "./pages/Feed/Feeds";
import Report from "./pages/Report/Report";
import MainCalendar from "pages/MainPage/MainCalendar";
import Email from "pages/Email/Email";
import CreateEmail from "pages/Email/CreateEmail";
import RecievedEmail from "pages/Email/RecievedEmail";
import SentEmail from "pages/Email/SentEmail";
import TrashEmail from "pages/Email/TrashEmail";
import InterestEmail from "pages/Email/InterestEmail";
import DetailEmail from "pages/Email/DetailEmail";
import Calendar from "pages/Calendar/prac";
////////////////////////////////
////////////////////////////////mobile
import FirstPage from "./pages/FirstPage";
import KakaoLogin from "pages/Login/KakaoLogin";
import MobileCommute from "pages/MobileCommute";
import MainTodo from "pages/NewMainPage/MainTodo";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Global } from "@emotion/react";
import { globalStyle } from "./themes/reset";
////////////////////////////////
import MainPage from "./pages/NewMainPage/MainPage";
import PageNotFound from "pages/PageNotFound";
import { RouterInfo } from "RouterInfo";

const isAuthenticated = localStorage.getItem("token");

const Authorization = ({ redirectTo, children }) => {
  if (redirectTo && !isAuthenticated) {
    return <Navigate to={redirectTo} />;
  } else {
    return <>{children}</>;
  }
};

function App() {
  return (
    <Router>
      <Global styles={globalStyle} />

      <Routes>
        {RouterInfo.map((route) => {
          if (route.children) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.withAuthorization ? (
                    <Authorization
                      isAuthenticated={isAuthenticated}
                      redirectTo="/"
                    >
                      {route.element}
                      {/* <Outlet /> */}
                    </Authorization>
                  ) : (
                    <>
                      {route.element}
                      {/* <Outlet /> */}
                    </>
                  )
                }
              >
                {route.children.map((childRoute) => (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            );
          } else {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.withAuthorization ? (
                    <Authorization
                      isAuthenticated={isAuthenticated}
                      redirectTo="/"
                    >
                      {route.element}
                    </Authorization>
                  ) : (
                    route.element
                  )
                }
              />
            );
          }
        })}
      </Routes>
    </Router>
  );
}

export default App;
