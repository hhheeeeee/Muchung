/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Radio from "@mui/material/Radio";
import { useNavigate } from "react-router-dom";
import { questions } from "./questions";
import { useState } from "react";

const steps = ["개인 정보 입력", "면접 전형", "인적성 검사", "최종 제출"];

function Ncs(props) {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/signup/final");
  };
  const [selectedValue, setSelectedValue] = useState(0);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

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
        <div className="questions">
          {questions.map((item) => (
            <div key={item.id}>
              <div className="question">
                {item.id}. {item.question}
              </div>
              <div className="radio">
                <span className="description">전혀 그렇지 않다</span>
                <Radio {...controlProps("a")} size="small" />
                <Radio {...controlProps("b")} />
                <Radio
                  {...controlProps("c")}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 28,
                    },
                  }}
                />
                <Radio {...controlProps("d")} />
                <Radio {...controlProps("e")} size="small" />
                <span className="description">매우 그렇다</span>
              </div>
            </div>
          ))}
        </div>
        <button className="next" onClick={handleNext}>
          next
        </button>
      </div>
    </div>
  );
}

export default Ncs;

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
    height: 60vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    margin-left: 100px;
  }

  .question {
    font-size: 20px;
    /* text-align: center; */
  }
  .radio {
    margin-bottom: 20px;
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
