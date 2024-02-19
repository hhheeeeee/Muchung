/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";

const steps = ["개인 정보 입력", "면접 전형", "인적성 검사", "최종 제출"];

function SignUpFinal(props) {
  const navigate = useNavigate();
  const handleFinish = () => {
    navigate("/login");
  };

  return (
    <div css={Container}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={3} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="content">
        <p className="text">무청컴퍼니 지원이 완료되었습니다.</p>
        <p className="text">지원 결과는 추후 메일을 통해 연락드리겠습니다.</p>
        <p className="text">수고하셨습니다.</p>
        <button className="next" onClick={handleFinish}>
          홈으로
        </button>
      </div>
    </div>
  );
}

export default SignUpFinal;

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
