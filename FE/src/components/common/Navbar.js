/* eslint-disable */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SideNavbar from "./SideNavbar";
import { CircleNotifications } from "@mui/icons-material";
import { NavbarMenus } from "./NavbarMenus";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  return (
    <div css={containerStyle} className="container">
      <div className="menus">
        {/* <img css={logoStyle} src={logo} alt="" /> */}

        {NavbarMenus.map((item) => {
          return (
            <div
              key={item.id}
              className={`menu ${
                location.pathname.includes(item.includes) ? "active" : ""
              }`}
            >
              <Link to={item.link}>
                {item.icon}
                <p>{item.name}</p>
              </Link>
            </div>
          );
        })}

        <CircleNotifications></CircleNotifications>
      </div>
    </div>
  );
}

export default Navbar;

// Navbar 컴포넌트의 스타일
const containerStyle = css`
  background-color: white;
  /* padding: 10px; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;

  .menus {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* margin-right: 20px; */

    &.active {
      background-color: #ddd;
      border-radius: 5px;
    }

    a {
      display: block;
      text-decoration: none;
      color: black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px 5px;
    }
  }
`;
