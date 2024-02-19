/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import { BASE_URL } from 'api/config';

const Recommend = ({ task, index, onChange, deleteRecommend }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [accessToken] = useState(localStorage.getItem('token'));

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleInputChange = (value) => {
    onChange(value);
  };

  const removeTask = (i) => {
    deleteRecommend(i);
  };

  const handleAddTask = async (title, event) => {
    event.stopPropagation();
    console.log(task);
    console.log(task.title);

    await axios // task 추가 api
      .post(
        `${BASE_URL}/tasks`,
        {
          title: task.title,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error) => {
        console.error('데이터를 추가하는 중 에러 발생:', error);
      });

    handleInputChange(task.title);
    removeTask(index);
  };

  return isVisible ? (
    <div css={mainContainer}>
      <div className={`content ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
        <div className="back">
          <div className="back-content">
            <svg
              stroke="#ffffff"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="50px"
              width="50px"
              fill="#ffffff"
            >
              <path
                d="M12 1c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1-12h2v2h-2v-2zm0 4h2v6h-2v-6z"
                fillRule="nonzero"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <strong>{task.title}</strong>
          </div>
        </div>
        <div className="front">
          <div className="img">
            <div className="circle"></div>
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
          </div>
          <div className="front-content">
            {task.reason}
            <button
              onClick={(event) => {
                handleAddTask(task.title, event);
              }}
            >
              선택
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Recommend;

const mainContainer = css`
  overflow: auto;
  width: 90%;
  height: 200px;
  margin: 15px;
  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 5px;
  }
  .front,
  .back {
    background-color: #151515;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
  }
  .back {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, #ff9966, transparent);
    animation: rotation_481 5000ms infinite linear;
  }
  .back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #151515;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
  .content.flipped {
    transform: rotateY(180deg);
  }
  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }
    0% {
      transform: rotateZ(360deg);
    }
  }
  .front {
    transform: rotateY(180deg);
    color: white;
  }
  .front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin-top: -30px;
  }
  .front-content .badge {
    background-color: #00000055;
    padding: 2px 10px;
    border-radius: 10px;
    backdrop-filter: blur(2px);
    width: fit-content;
  }
  .description {
    box-shadow: 0px 0px 10px 5px #00000088;
    width: 100%;
    padding: 10px;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 5px;
  }
  .title {
    font-size: 11px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .title p {
    width: 50%;
  }
  .card-footer {
    color: #ffffff88;
    margin-top: 5px;
    font-size: 8px;
  }
  .front .img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #ffbb66;
    position: relative;
    filter: blur(15px);
    animation: floating 2600ms infinite linear;
  }
  #bottom {
    background-color: #ff8866;
    left: 50px;
    top: 0px;
    width: 150px;
    height: 150px;
    animation-delay: -800ms;
  }
  #right {
    background-color: #ff2233;
    left: 160px;
    top: -80px;
    width: 30px;
    height: 30px;
    animation-delay: -1800ms;
  }
  @keyframes floating {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  button {
    position: absolute;
    bottom: 17%;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 40px;
    font-size: 15px;
    border-radius: 20px;
  }
`;
