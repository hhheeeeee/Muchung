/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState, useRef } from 'react';
import FeedCard from './FeedCard';
import { getFeedApi } from './FeedApi.js';

function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [page, setPage] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const targetElement = divRef.current;

      if (targetElement.scrollTop + targetElement.clientHeight >= targetElement.scrollHeight) {
        setPage((page) => page + 1);
      }
    };
    const targetElement = divRef.current;
    targetElement.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    getFeedApi(page, ({ data }) => {
      setFeeds(feeds.concat(data));
    });
  }, [page]);

  if (!feeds) {
    return (
      <div css={container}>
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </div>
    );
  }

  return (
    <div ref={divRef} style={{ overflow: 'auto', height: '100%' }}>
      {feeds.map((feed) => (
        <FeedCard key={feed.id} feed={feed} />
      ))}
    </div>
  );
}

export default Feed;

const container = css`
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
