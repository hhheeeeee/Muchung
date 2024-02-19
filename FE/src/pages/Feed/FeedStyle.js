import styled, { css } from 'styled-components';

export const FeedWrap = styled.div`
  background-color: #f6f6f6;
  margin: 1rem;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 0.7rem;
`;

export const Member = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props) => (props.type === 'feed' ? '1rem' : '0')};
  img {
    width: ${(props) => (props.type === 'feed' ? '3rem' : '2.1rem')};
    height: ${(props) => (props.type === 'feed' ? '3rem' : '2.1rem')};
    border-radius: 50%;
    border: 1px solid #a6a6a6;
  }
`;

export const UserDetail = styled.div`
  display: flex;
`;

export const UserInfo = styled.div`
  margin-left: 0.5rem;
  width: 100%;
`;

export const Part = styled.div`
  font-size: ${(props) => (props.type === 'feed' ? '0.8rem' : '0.75rem')};
  background-color: ${(props) =>
    props.dept === '영업부'
      ? '#d6eacc'
      : props.dept === '개발부'
      ? '#f7d7f5'
      : props.dept === '기획부'
      ? '#eae8c9'
      : '#ffffff'};
  display: inline-block;
  padding: 0.1rem;
  border-radius: 15%;
  margin-left: 0.3rem;
`;

export const Name = styled.div`
  font-size: ${(props) => (props.type === 'feed' ? '1.1rem' : '0.9rem')};
`;

export const Date = styled.div`
  margin-top: ${(props) => (props.type === 'feed' ? '0.4rem' : '0.2rem')};
  font-size: ${(props) => (props.type === 'feed' ? '0.8rem' : '0.7rem')};
  color: #adb5bd;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Tasks = styled.div`
  margin: 1rem 0;
`;

export const Review = styled.div`
  margin: 1.2rem 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #cacaca;
  line-height: 140%;
  white-space: pre-line;
`;

// *************** 댓글 스타일 ***************

export const LikeCommentCount = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 1.5rem;
  }

  margin-bottom: 1rem;

  span {
    margin: 0 0.7rem 0 0.5rem;
  }
`;
export const CommentWrap = styled.div`
  margin: 1rem;
`;

export const CommentButton = styled.div`
  display: flex;
`;

export const But = styled.div`
  border: none;
  background-color: transparent;
  color: ${(props) => (props.type === 'modify' ? '#6798FD' : '#DB8383')};
  margin-left: 0.4rem;
  font-size: 0.75rem;
`;

export const InputWrap = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;

  textarea {
    flex: 5;
    resize: none;
    height: 1rem;
    border: none;
    border-radius: 10px;
    padding: 0.5rem;
    display: inline-flex;
  }
  div {
    flex: 1;
    background-color: #8ea8db;
    color: #ffffff;
    text-align: center;
    border-radius: 10px;
    margin-left: 0.5rem;
    padding: 0.5rem 0.1rem;
  }
`;

export const Comment = styled.div`
  margin-top: 1rem;
  border-radius: 10px;
  white-space: pre-line;
`;

export const Content = styled.div`
  padding-top: 0.5rem;
  font-size: 0.9rem;
  margin-left: 2.7rem;
  line-height: 130%;
  white-space: pre-line;
`;

// *************** task 스타일 ***************

export const Task = styled.div`
  position: relative;
  height: 20rem;
  margin: 0 1rem 0 1rem;
`;

export const TaskItem = styled.div`
  width: 100%;
  text-align: center;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  position: absolute;
  ${({ display }) =>
    display &&
    css`
      opacity: 1;
    `};
`;

export const Img = styled.div`
  background-color: #fffffb;
  height: 17rem;
  display: flex;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const Text = styled.div`
  margin: 0.7rem 0;
  padding: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: inset 0 -1.2rem 0 #c4deff;
  display: inline-block;
`;

export const Toggles = styled.div`
  display: flex;
  justify-content: center;
`;

export const Toggle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${(props) => (props.display ? '#3261C1' : '#e5e5e5')};
  margin: 1rem 0.2rem;
  transition: background-color 0.3s ease;
`;
