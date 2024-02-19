/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";

const steps = ["개인 정보 입력", "면접 전형", "인적성 검사", "최종 제출"];

function SignUp() {
  const navigate = useNavigate();
  const goToInterview = () => {
    navigate("/signup/0");
  };

  return (
    <div css={containerStyles}>
      <p>회원가입</p>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div css={contentStyles}>
        <p>여기는 개인정보 넣는 칸임</p>
        <button onClick={goToInterview}>next</button>
      </div>
    </div>
  );
}

export default SignUp;

const containerStyles = css`
  height: 100px;
`;
const contentStyles = css`
  height: 100%;
`;
