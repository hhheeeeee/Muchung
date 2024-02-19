/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Modal from '@mui/material/Modal';
import Recommend from './Recommend';
import axios from 'axios';
import { BASE_URL } from 'api/config';
import styled from '@emotion/styled';
import Button from '@mui/joy/Button';
import { keyframes } from '@emotion/react';

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledButton = styled(Button)`
  animation: ${fadeInAnimation} 0.5s ease-in;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RecommendButton = ({ Todolist, onChange }) => {
  const [open, setOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleOpen = () => {
    console.log(Todolist);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //const recommendations = ['빨래하기', '노래방에서 아이유 노래 부르기', '점심밥 직접 요리하기'];

  // 서버에서 주는 추천 목록으로 바꿔야함 !
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BASE_URL}/recommend`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const taskList = response.data;

      setRecommendations(taskList);
    };

    fetchData();
  }, []);

  //   // Todolist의 title과 일치하지 않는 요소들만 필터링
  //   const filteredRecommendations = recommendations.filter(
  //     (recommendation) => !Todolist.some((task) => task.title === recommendation)
  //   );

  const deleteRecommend = (index) => {
    setRecommendations(recommendations.filter((item, idx) => idx !== index));
  };

  return (
    <div css={mainContainer}>
      <StyledButton onClick={handleOpen}>업무 추천</StyledButton>
      <Modal open={open} onClose={handleClose}>
        <div className="modalContent">
          {/* <button className="closeButton" onClick={handleClose}>
            닫기
          </button> */}
          <div className="recommendations">
            {recommendations.map((recommendation, index) => (
              <Recommend
                key={index}
                task={recommendation}
                index={index}
                onChange={onChange}
                deleteRecommend={deleteRecommend}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecommendButton;

const speechbubble = css`
  margin-bottom: 0.5rem;
  width: 14rem;
  overflow: visible;

  .speech-bubble {
    position: relative;
    background: #c9e1ff;
    border-radius: 0.4em;
    padding: 0.8rem;
  }

  .speech-bubble:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 0.5em solid transparent;
    border-left-color: #c9e1ff;
    border-right: 0;
    border-bottom: 0;
    margin-top: -0.203em;
    margin-right: -0.35em;
  }
`;

const mainContainer = css`
  display: flex;
  justify-content: center;

  .modalContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: transparent;
    max-width: 80vw;
    max-height: 80vh;
    overflow-y: auto;
    overflow: auto;
  }

  .closeButton {
    margin-bottom: 10px;
    background-color: #ccc;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }

  .closeButton:hover {
    background-color: #999;
  }

  .recommendations {
    overflow: 'auto';
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;
