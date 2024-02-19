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
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div css={Container}>
      <p>회원가입</p>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={3} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div>
        <p>여기는 Final 칸임</p>
        <button onClick={goToLogin}>next</button>
      </div>
    </div>
  );
}

export default SignUpFinal;

let Container = css`
  background-color: rgb(232, 234, 247);
  height: 70vh;
`;
