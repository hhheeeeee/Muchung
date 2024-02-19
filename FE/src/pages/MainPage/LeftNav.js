/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import logontext from "assets/logontext.png";
import Avatar from "@mui/material/Avatar";
import dummy from "assets/blankimg.jpg";
import NavMenus from "./NavMenus";

const LeftNav = ({ isNavbarOpen }) => {
  return (
    <>
      <div css={mainContainer}>
        <div className="content">
          <div className="logo">
            <Link to="/main">
              <img className="logoimg" src={logontext} alt="" />
            </Link>
          </div>
          <div className="profile">
            <div className="profilecontent">
              <Avatar alt="profileimg" src={dummy} />
              <p className="name" css={hidden(isNavbarOpen)}>
                김무청
              </p>
              <p css={hidden(isNavbarOpen)}>개발 2팀</p>
            </div>
          </div>
          <div className="menus">
            <NavMenus></NavMenus>
          </div>
          <div className="bottom"></div>
        </div>
      </div>
    </>
  );
};

export default LeftNav;

const mainContainer = css`
  display: flex;
  width: 100%;
  height: 100vh; // 전체 화면 사용
  align-items: center;
  justify-content: center;
  background-color: rgb(249, 250, 251);

  .content {
    width: 85%;
    height: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1.5rem;
    position: relative;
    overflow: hidden;

    /* background-color: blue; */
  }

  .logo {
    width: 100%;
    flex: 1;
  }
  .logoimg {
    width: 100%;
    object-fit: fill;
  }

  .profile {
    width: 100%;
    flex: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(236, 239, 242);
    border-radius: 10px;

    .profilecontent {
      width: 80%;
      height: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .name {
      font-size: 20px;
      margin: 10px 10px;
    }

    .MuiAvatar-root {
      width: 50%;
      height: auto;
      border-radius: 50%;
    }
  }

  .menus {
    width: 100%;
    flex: 4;
  }

  .bottom {
    width: 100%;
    flex: 3;
    /* background-color: green; */
  }
`;

const hidden = (isNavbarOpen) => css`
  display: ${isNavbarOpen === "true" ? "block" : "none"};
  transition: width 0.3s ease;
`;
