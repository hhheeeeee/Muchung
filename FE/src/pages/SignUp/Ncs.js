/* eslint-disable */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Radio from "@mui/material/Radio";
import { useNavigate } from "react-router-dom";
import { questions } from "./questions";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "api/config";

const steps = ["개인 정보 입력", "인적성 검사", "최종 제출"];

function Ncs(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedValues, setSelectedValues] = useState({});

  const handleChange = (event, id) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [id]: event.target.value,
    }));
  };

  const controlProps = (item) => ({
    checked: selectedValues[item.id] === item.value.toString(), // 수정된 부분
    onChange: (event) => handleChange(event, item.id),
    value: item.value.toString(), // 수정된 부분
    inputProps: { "aria-label": item.value.toString() }, // 수정된 부분
  });

  const handleNext = async (number) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/member/department/${number}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // 요청이 성공한 경우에만 페이지 이동
      if (response.status === 200) {
        console.log("NCS 전달 성공");
        navigate("/signup/final");
      } else {
        console.log("오류 발생");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <div css={mobilecontainer}>
            <button className="btn first" onClick={() => handleNext(1)}>
              꾸준히 하고 싶은 일이 있어요
            </button>
            <button className="btn second" onClick={() => handleNext(2)}>
              새로운 사람들과 소통하고 싶어요
            </button>
            <button className="btn third" onClick={() => handleNext(3)}>
              취미를 공유하고 싶어요
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Ncs;

const mobilecontainer = css`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .btn {
    width: 80%;
    height: 25%;
    border-radius: 10px;
    border: none;
  }

  .first {
    background-color: #d6eacc;

    :hover {
      background-color: #cbdbc3;
    }
  }

  .second {
    background-color: #f7d7f5;

    :hover {
      background-color: #eac9e8;
    }
  }

  .third {
    background-color: #eae8c9;

    :hover {
      background-color: #e2e1c0;
    }
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
  .questions {
    border: 1px solid grey;
    border-radius: 10px;
    padding: 30px 40px;
    height: 50vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
  }

  .question {
    font-size: 20px;
    text-align: center;
  }
  .radio {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .description {
    font-size: 10px;
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

const Loading = function () {
  return (
    <div css={loadingcontainer}>
      <section className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    </div>
  );
};

const loadingcontainer = css`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;

  .dots-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .dot {
    height: 20px;
    width: 20px;
    margin-right: 10px;
    border-radius: 10px;
    background-color: #b3d4fc;
    animation: pulse 1.5s infinite ease-in-out;
  }

  .dot:last-child {
    margin-right: 0;
  }

  .dot:nth-of-type(1) {
    animation-delay: -0.3s;
  }

  .dot:nth-of-type(2) {
    animation-delay: -0.1s;
  }

  .dot:nth-of-type(3) {
    animation-delay: 0.1s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      background-color: #b3d4fc;
      box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }

    50% {
      transform: scale(1.2);
      background-color: #6793fb;
      box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
    }

    100% {
      transform: scale(0.8);
      background-color: #b3d4fc;
      box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }
  }
`;
