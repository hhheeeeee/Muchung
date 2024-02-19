import React, { useState, useRef } from 'react';
import {
  Member,
  UserInfo,
  Name,
  Part,
  Date,
  UserDetail,
  Content,
  Comment,
  InputWrap,
  CommentButton,
  But,
} from './FeedStyle';
import { BASE_URL } from 'api/config';
import axios from 'axios';
import { modifyCommentApi } from './FeedApi.js';

function CommentItem({ comment, getComments }) {
  const [modify, setModify] = useState(false);
  const commentInputRef = useRef();

  const deleteComment = async (e) => {
    await axios
      .delete(`${BASE_URL}/comments/${comment.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        getComments();
      })
      .catch((error) => {
        console.log(error);
        alert('삭제에 실패하였습니다!');
      });
  };

  const clickModify = () => {
    setModify(!modify);
  };

  const modifyComment = async () => {
    if (!(await modifyCommentApi(comment.id, commentInputRef.current.value))) {
      alert('수정에 실패하였습니다!');
    } else {
      comment.content = commentInputRef.current.value;
    }
    clickModify();
  };

  const submit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        commentInputRef.current.value += '\n';
      } else {
        modifyComment();
      }
    }
  };

  return (
    <>
      <Comment>
        <Member type="comment">
          <img src={comment.member.image} alt="" />
          <UserInfo>
            <UserDetail>
              <Name type="comment">{comment.member.name}</Name>
              <Part type="comment" dept={comment.member.department}>
                {comment.member.department}
              </Part>
            </UserDetail>
            <Date type="comment">
              {comment.createdAt}
              {localStorage.getItem('memberId') == comment.member.id ? (
                <CommentButton>
                  <But type="modify" onClick={clickModify}>
                    수정
                  </But>
                  <But type="remove" onClick={deleteComment}>
                    삭제
                  </But>
                </CommentButton>
              ) : (
                <CommentButton />
              )}
            </Date>
          </UserInfo>
        </Member>

        {modify ? (
          <InputWrap>
            <textarea defaultValue={comment.content} ref={commentInputRef} onKeyDown={submit}></textarea>
            <div onClick={modifyComment}>수정</div>
            <div onClick={clickModify}>취소</div>
          </InputWrap>
        ) : (
          <Content>{comment.content}</Content>
        )}
      </Comment>
    </>
  );
}

export default CommentItem;
