/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const steps = ["개인 정보 입력", "면접 전형", "인적성 검사", "최종 제출"];

function PersonalInfo() {
  const navigate = useNavigate();
  const HandleNext = () => {
    navigate("/signup/interview");
  };

  return (
    <div css={containerStyles}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="content">
        <p className="contentheader">입 사 지 원 서</p>
        <div className="userinput">
          <div className="userform">
            <div className="picture">사진</div>
            <div className="text">
              <table className="table">
                <tr>
                  <th className="tablehead">이름</th>
                  <td>이름이름</td>
                </tr>
                <tr>
                  <th className="tablehead">이메일</th>
                  <td>email@gmail.com</td>
                </tr>
                <tr>
                  <th className="tablehead">전화번호</th>
                  <td>010-2020-0202</td>
                </tr>
                <tr>
                  <th className="tablehead">소개</th>
                  <td>
                    <TextField
                      // error
                      label="소개를 입력해주세요"
                      // defaultValue="Hello World"
                      // helperText="소개를 입력해주세요"
                      variant="standard"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <button className="next" onClick={HandleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PersonalInfo;

const containerStyles = css`
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
    background-color: rgb(249, 249, 249);
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .contentheader {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .userinput {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .userform {
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 30px;
    border: 1px solid black;
  }

  .text {
    width: 70%;
  }

  .picture {
    width: 30%;
    height: 100%;
    background-color: grey;
    margin-right: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid black;
  }
  table th {
    background-color: lightgray;
  }

  table th,
  table td {
    border: none;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    padding: 8px;
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
