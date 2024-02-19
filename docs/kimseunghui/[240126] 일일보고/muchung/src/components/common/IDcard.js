/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useState } from "react";

function IDcard() {
  // 프로그레스바 MUI
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  const [startWork, setStartWork] = useState("");
  const [startButtonClicked, setStartButtonClicked] = useState(false);
  const [leaveWork, setLeaveWork] = useState("");
  const [leaveButtonClicked, setLeaveButtonClicked] = useState(false);

  const handleButtonClick = (setWork, setButtonClicked) => {
    return () => {
      let today = new Date();
      let hours = today.getHours(); // 시
      let minutes = today.getMinutes(); // 분
      let seconds = today.getSeconds(); // 초
      setWork(`${hours}:${minutes}:${seconds}`);
      setButtonClicked(true);
    };
  };

  return (
    <div css={container}>
      <div className="box1 info">
        <div className="profileimg">
          <div className="img">
            {/* <img className="img" src={person} alt="" /> */}
          </div>
        </div>
        <div className="infodetail">
          <p className="name">이름</p>
          <p className="description team">개발부서 2팀</p>
          <BorderLinearProgress variant="determinate" value={90} />
          <p className="description howlong">무업청년들과 함께한지 n일째</p>
        </div>
      </div>
      <div className="box1 attendance">
        <button
          className={`btn gotowork ${startButtonClicked ? "disabled" : ""}`}
          onClick={handleButtonClick(setStartWork, setStartButtonClicked)}
          disabled={startButtonClicked}
        >
          출근 {startWork}
        </button>
        <button
          className={`btn leavework ${leaveButtonClicked ? "disabled" : ""}`}
          onClick={handleButtonClick(setLeaveWork, setLeaveButtonClicked)}
          disabled={leaveButtonClicked}
        >
          퇴근 {leaveWork}
        </button>
      </div>
    </div>
  );
}

export default IDcard;

const container = css`
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  border-radius: 10px;

  .box1 {
    width: 90%;
    /* border: 1px solid blue; */
  }

  .info {
    height: 100%;
    flex: 2;
    display: flex;
  }

  .attendance {
    flex: 1;
    display: flex;
    justify-content: space-around;
  }

  .profileimg {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .img {
    border-radius: 50%;
    background-color: skyblue;
    aspect-ratio: 1;
  }

  .infodetail {
    padding: 10px;
    flex: 3;
    /* background-color: yellow; */
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .name {
    font-size: 25px;
    margin-bottom: 5px;
  }

  .description {
    margin: 10px 0px;
    color: grey;
  }

  .howlong {
    font-size: 10px;
  }

  .btn {
    width: 40%;
    height: 50%;
    border: none;
    border-radius: 20px;
  }
`;
