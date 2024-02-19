import styled, { keyframes } from 'styled-components';
import { TypeAnimation } from 'react-type-animation';

export const ChatContent = styled.div`
  background-color: plum;
`;

// [body+footer]
export const ContentMain = styled.div`
  /* background-color: red; */
  /* margin-top: 5rem; */

  background-color: beige;
  /* width: 100wh; */
  /* height: 100%; */
  //display: flex;
  /* flex-direction: column; */
  //margin: 4rem;
  /* min-height: 100vh; // 최소 화면 높이 설정 */
  /* margin: rem 0; */
`;

// [body] 채팅 메시지 부분
export const ContentBody = styled.div`
  /* background-color: yellow; */
  padding: 1rem;
  /* flex: 1; */
  overflow-y: auto;
  height: 72vh;
`;

// 말풍선 row 하나 (프사 + 메시지 + 시간)
export const ChatItemMain = styled.div`
  /* background-color: aliceblue; */
  display: flex;
  align-items: flex-end;
  margin-bottom: 1.2rem;
`;

// 1) speaker 프로필 사진
export const ChatItemSpeaker = styled.div`
  /* background-color: blueviolet; */
  width: 2.5rem;
  height: 2.5rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 30rem;
  }
`;

// 2) 발화자 이름 + 메시지
export const ChatItemContent = styled.div`
  /* background-color: red; */
  max-width: 60%;
  margin: 0 0.5rem 0 0.5rem;
  font-size: 0.9rem;
`;

// 2-1) 발화자
export const ChatSpeaker = styled.div`
  padding: 0.5rem 0.5rem 0.4rem 0.5rem;
  font-weight: bold;
  display: flex;
  /* background-color: red; */
  /* text-align: end; */
`;

// 2-2) 메시지
export const ChatMsg = styled.div`
  background-color: pink;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  line-height: 1.5rem;
`;

const TypeAnimationCursor = keyframes`
    50% {
        opacity: 0;
    }
`;

export const StyledTypeAnimation = styled(TypeAnimation)`
  cursor: false;
  &.custom-type-animation-cursor::after {
    content: '|';
    animation: ${TypeAnimationCursor} 1.1s infinite step-start;
  }
`;

// 3) meta 정보: 시간
export const ChatMeta = styled.div`
  /* background-color: brown; */
  color: gray;
  font-style: italic;
  font-size: small;
`;

// [footer] 하단 text input row
export const ContentFooter = styled.div`
  /* background-color: rosybrown; */
  /* width: 100%; // viewport의 너비에 맞게 설정 */
  /* position: fixed; */
  /* bottom: 0; */
  /* left: 0; */
  /* display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 2rem 1rem 2rem; */
  padding-top: 0.5rem;
`;

export const ContentHelper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0.8rem 0;
  column-gap: 0.7rem;

  button {
    box-sizing: border-box;
    padding: 0.5rem 0.8rem 0.5rem 0.8rem;
    border-radius: 3rem;
    border: 0;
    cursor: pointer;
    box-shadow: 0.2rem;
    font-size: 0.6rem;
    pointer-events: ${({ btnmove }) => (btnmove ? 'auto' : 'none')};
    cursor: ${({ btnmove }) => (btnmove ? 'pointer' : 'auto')};
    background-color: ${({ btnmove }) => (btnmove ? `#ffd1dc` : 'lightgray')};
  }

  button:hover {
    box-shadow: 3rem;
    background-color: pink;
  }
`;

export const UserInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 1rem 0.5rem 1rem;
  textarea {
    flex: 1;
    border-radius: 2rem;
    line-height: 1.5rem;
    border: 0;
    font-family: 'PretendardRegular';
    font-size: 1rem;
    overflow-y: hidden;
    resize: none;
    box-sizing: border-box; /* Ensure padding is included in height */
    padding: 0.7rem 0.7rem 0.7rem 0.7rem;
    margin: 0 1rem 0 0;
  }

  textarea:focus {
    outline: none;
  }

  div {
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
    box-sizing: border-box; /* Ensure padding is included in height */
    padding: 0.4rem 0.4rem 0.4rem 0.4rem;
  }
`;
