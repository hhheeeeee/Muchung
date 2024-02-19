// intro 맨 윗 부분 글씨 애니메이션 나오는 부분
/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import SplitTextToChars from "./SplitTextToChars";
import imgupper from "./../../assets/introbackgroundupper.png";

function IntroUpper() {
  const wavyTextRef = useRef(null);

  useEffect(() => {
    if (!wavyTextRef.current) return;
    const chars = SplitTextToChars(wavyTextRef.current);

    gsap.set(wavyTextRef.current, { perspective: 400 });

    gsap.from(
      chars,
      {
        duration: 0.2,
        opacity: 0,
        scale: 1,
        delay: 2,
        y: -40,
        rotationX: -90,
        transformOrigin: "0% 50% -50",
        ease: "inOut",
        stagger: 0.005,
      },
      "+=0"
    );
  }, []);

  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/signup/personalinfo");
  };

  return (
    <div css={box}>
      <p className="text" ref={wavyTextRef}>
        무업청년들에서 신입 사원을 모집합니다
      </p>
      <button onClick={handleNext} className="btn">
        지원하기
      </button>
    </div>
  );
}

const box = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  /* background-image: url(${imgupper});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; */

  .text {
    font-size: calc(32px + (64 - 32) * ((100vw - 320px) / (1600 - 320)));
    font-weight: 800;
    margin: 0;
    color: black;
    margin-bottom: 40px;
  }

  .btn {
    padding: 10px 20px;
    background-color: rgb(48, 141, 229);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
  }

  .btn:hover {
    background-color: #1976d2;
  }
`;

export default IntroUpper;
