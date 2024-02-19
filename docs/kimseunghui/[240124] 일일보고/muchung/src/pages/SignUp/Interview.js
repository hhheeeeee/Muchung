/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";
// import { themes } from "../../themes/palette";

const steps = ["개인 정보 입력", "면접 전형", "인적성 검사", "최종 제출"];

function Interview(props) {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/signup/ncsintro");
  };

  return (
    <div css={Container}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="content">
        <p className="text">무업청년들은 거꾸로 면접을 진행합니다.</p>
        <p className="text">
          거꾸로 면접은 지원자가 우리 회사를 면접하는 형태로 진행됩니다.
        </p>
        <p className="text">무업청년들 인사 담당자와 자유로운 질의 응답 후</p>
        <p className="text">입사 희망 여부를 선택해주시기 바랍니다.</p>

        <button className="next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Interview;

// background-color: ${themes.backgroundColor};

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
