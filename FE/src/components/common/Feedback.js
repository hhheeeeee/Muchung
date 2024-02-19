/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";

function Feedback() {
  const [feedback, setFeedback] = useState([
    "아직 업무에 대한 피드백이 없습니다.",
  ]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/feedback")
      .then((res) => {
        console.log(res.data);
        setFeedback(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div css={container}>
      <div className="box">
        <div className="clip"></div>
        <div className="paper">
          <div className="papercontent">
            <p className="title">최근 업무 보고 피드백</p>
            {feedback.map((item) => {
              return (
                <div key={item.id} className="comment">
                  <p>■ {item.name}</p>
                  <p>{item.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .box {
    width: 90%;
    height: 90%;
    background-color: rgb(201, 206, 239);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: relative;
  }

  .clip {
    position: absolute;
    width: 30%;
    height: 10%;
    background-color: rgb(57, 99, 206);
    left: 35%;
    top: -4px;
  }

  .paper {
    background-color: white;
    width: 80%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .papercontent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 80%;
  }

  .title {
    /* align-self: flex-start; */
    margin-bottom: 20px;
    font-weight: 900;
    font-size: 20px;
  }

  .comment * {
    margin-bottom: 10px;
  }
`;
