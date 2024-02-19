/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import newsimg from "./../../assets/test/news.jpg";
import news from "./../../assets/test/news.mp4";

function Broadcast() {
  const [isPlaying, setIsPlaying] = useState(false);

  const onMouseOver = () => {
    setIsPlaying(true);
  };

  const onMouseOut = () => {
    setIsPlaying(false);
  };

  return (
    <div css={container}>
      <p>사내 방송</p>
      <div className="media">
        {isPlaying ? (
          <video>
            <source src={news} type="video/mp4" />
          </video>
        ) : (
          <img
            className="img"
            src={newsimg}
            alt="news"
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          />
        )}
      </div>
    </div>
  );
}

export default Broadcast;

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  border-radius: 10px;

  .media {
    width: 90%;
    height: 80%;
  }

  .video {
    width: 100%;
    border: 1px solid blue;
  }

  .img {
    width: 100%;
    height: 80%;
    object-fit: cover;
    border: 1px solid blue;
  }
`;
