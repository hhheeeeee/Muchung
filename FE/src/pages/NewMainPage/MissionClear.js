/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@mui/joy/Button';
import { keyframes } from '@emotion/react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
  text-decoration: none;
  color: red; /* 링크의 색상 설정 */
`;

const MissionClear = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CHAT_AUTH = ['admin', '임원'];

  return (
    <StyledButton>
      {CHAT_AUTH.includes(localStorage.getItem('department')) ? (
        <Link to="/main/chat">업무 보고하기</Link>
      ) : (
        <Link to="/main/report">업무 보고서 작성</Link>
      )}
    </StyledButton>
  );
};

export default MissionClear;

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
