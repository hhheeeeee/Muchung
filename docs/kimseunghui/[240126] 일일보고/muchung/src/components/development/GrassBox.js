/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { grasstest } from "./test/GrassTest";

function GrassBox() {
  const totalDivs = 50; // div 칸의 총 개수
  const remainingDivs = totalDivs - grasstest.length; // 남는 div 개수

  return (
    <div css={container}>
      <p>잔디</p>
      <div className="grassbox">
        {/* 데이터에 해당하는 div */}
        {grasstest.map((time, index) => (
          <div
            key={index}
            className="box"
            style={{
              opacity: `${Math.floor((time.time / 40) * 100)}%`,
            }}
          >
            {/* Day: {time.day}, Time: {time.time} */}
          </div>
        ))}

        {/* 남는 흰색 div */}
        {Array(remainingDivs)
          .fill()
          .map((_, index) => (
            <div
              key={index + grasstest.length}
              className="box"
              style={{
                opacity: 0,
              }}
            />
          ))}
      </div>
    </div>
  );
}

export default GrassBox;

const container = css`
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  border-radius: 10px;

  .grassbox {
    width: 90%;
    height: 70%;
    border: 1px solid green;
    font-size: 10px;
    display: grid;
    grid-template-columns: repeat(10, 1fr); /* 가로줄에 5개씩 열 생성 */
    grid-template-rows: repeat(5, 1fr); /* 세로줄에 10개씩 행 생성 */
    gap: 5px; /* 각 box 사이의 간격 설정 */
  }
  .box {
    width: 20px;
    height: 20px;
    border: 1px solid grey;
    background-color: rgb(90, 131, 200);
    border-radius: 2px;
  }
`;
