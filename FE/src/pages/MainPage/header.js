/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NotificationsPopover from "./notification";
import { Mobile, PC } from "components/common/Responsive";

const Header = () => {
  return (
    <>
      <PC>
        <div css={mainContainer}>
          <div className="content">
            <div className="welcome">무청컴퍼니에 오신 것을 환영합니다</div>
            <NotificationsPopover></NotificationsPopover>
          </div>
        </div>
      </PC>

      <Mobile>
        <div>header</div>
      </Mobile>
    </>
  );
};

export default Header;

const mainContainer = css`
  display: flex;
  width: 100%;
  height: 7dvh;
  background-color: rgb(249, 250, 251);
  align-self: start;
  align-items: center;
  justify-content: center;

  .content {
    width: 88%;
    height: 100%;
    display: flex;
    justify-content: space-between; // 두 개의 요소를 양쪽으로 분산
    align-items: flex-end; // 아래쪽으로 정렬
  }

  .welcome {
    /* align-self: end; */
    font-weight: 600;
    font-size: 1.3rem;
    align-items: center;
  }
`;
