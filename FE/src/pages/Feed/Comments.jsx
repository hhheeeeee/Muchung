import React, { useEffect, useState, useRef } from 'react';
import { LikeCommentCount, CommentWrap, InputWrap } from './FeedStyle';
import axios from 'axios';
import { BASE_URL } from 'api/config';
import CommentItem from './CommentItem';
import Heart from '../../assets/heart.png';
import ColorHeart from '../../assets/color-heart.png';
import CommentIcon from '../../assets/comment.png';
import { getCommentApi, likeApi } from './FeedApi.js';

function Comments({ myLike, likeCount, commentData, reportId }) {
  const [comments, setComments] = useState(commentData);
  const [likes, setLikes] = useState(likeCount);
  const [likeYn, setLikeYn] = useState(myLike);
  const commentInputRef = useRef();

  const getComments = () => {
    getCommentApi(reportId, ({ data }) => {
      setComments(data);
    });
  };

  const writeComment = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${BASE_URL}/reports/${reportId}/comments`,
        {
          content: commentInputRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        commentInputRef.current.value = '';
        getComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submit = async (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        event.preventDefault();
        commentInputRef.current.value += '\n';
      } else {
        await writeComment(event);
      }
    }
  };

  const like = async () => {
    await likeApi(reportId);
    setLikes(likes + (likeYn === 1 ? -1 : 1));
    setLikeYn(likeYn === 1 ? 0 : 1);
  };

  return (
    <CommentWrap>
      <LikeCommentCount>
        {likeYn ? (
          <img src={ColorHeart} alt="ColorHeart" onClick={like} />
        ) : (
          <img src={Heart} alt="Heart" onClick={like} />
        )}

        <span>{likes}</span>
        <img src={CommentIcon} alt="CommentIcon" />
        <span>{comments.length}</span>
      </LikeCommentCount>

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} getComments={getComments} />
      ))}

      <InputWrap>
        <textarea placeholder="피드백을 작성해주세요.." ref={commentInputRef} onKeyDown={submit}></textarea>
        <div onClick={writeComment}>입력</div>
      </InputWrap>
    </CommentWrap>
  );
}

export default Comments;
