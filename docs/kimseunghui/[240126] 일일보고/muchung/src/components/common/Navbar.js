/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SideNavbar from "./SideNavbar";
import logo from "./../../assets/logontext.png";

function Navbar() {
  return (
    <div css={containerStyle} className="container">
      <div className="menus">
        <SideNavbar></SideNavbar>
        <img className="logo" src={logo} alt="" />
        네브바임^^
      </div>
    </div>
  );
}

export default Navbar;

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(85, 99, 114);
  height: 10vh;
  width: 100%;

  .menus {
    width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    height: 70%;
  }
`;
