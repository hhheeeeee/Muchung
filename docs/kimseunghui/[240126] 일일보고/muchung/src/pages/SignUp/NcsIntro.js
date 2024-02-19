/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";

const steps = ["개인 정보 입력", "면접 전형", "인적성 검사", "최종 제출"];

function NcsIntro(props) {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/signup/ncs");
  };
  return (
    <div css={Container}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="content">
        <p className="text">
          지원자님의 성향에 적합한 부서 배치를 위해 인적성 검사를 진행합니다.
        </p>
        <p className="text">다음 질문들에 대해 각각 동의하는 정도에 따라</p>
        <p className="text">
          '전혀 그렇지 않다' ~ '매우 그렇다' 중 하나를 선택하십시오
        </p>

        <button className="next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default NcsIntro;

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
