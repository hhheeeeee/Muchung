/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";
import { Mobile, PC } from "components/common/Responsive";
import checked from "assets/checked.gif";

const steps = ["개인 정보 입력", "인적성 검사", "최종 제출"];

function SignUpFinal(props) {
  const navigate = useNavigate();
  const handleFinish = () => {
    navigate("/");
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={3} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div css={mobilecontainer}>
        <img src={checked} alt="" />
        <p className="text">
          🎉 축하합니다! 무청컴퍼니에 지원이 완료되었어요! 👏
        </p>
        <p className="text">지원 결과는 조금만 기다리시면</p>
        <p className="text">📬 메일로 곧 찾아갈 거에요.</p>
        <p className="text">😊 지원해주셔서 감사합니다.</p>
        <button className="next" onClick={handleFinish}>
          홈으로
        </button>
      </div>
    </>
  );
}

export default SignUpFinal;

const mobilecontainer = css`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text {
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .next {
    padding: 10px 20px;
    background-color: rgb(48, 141, 229);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
  }

  .next:hover {
    background-color: #1976d2;
  }
`;

const Container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .content {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    padding: 20px;
  }

  .text {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .next {
    padding: 10px 20px;
    background-color: rgb(48, 141, 229);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
  }

  .next:hover {
    background-color: #1976d2;
  }
`;
