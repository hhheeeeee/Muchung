import React from 'react';
import { FeedWrap, Member, UserInfo, Name, Part, Date, UserDetail, Review } from './FeedStyle';
import Comments from './Comments';
import Tasks from './Tasks';

function FeedCard({ feed }) {
  return (
    <FeedWrap>
      {/* 유저 정보 (프로필, 이름, 부서) */}
      <Member type="feed">
        <img src={feed.member.image} alt="" />
        <UserInfo>
          <UserDetail>
            <Name type="feed">{feed.member.name}</Name>
            <Part type="feed" dept={feed.member.department}>
              {feed.member.department}
            </Part>
          </UserDetail>
          <Date type="feed">{feed.reportDate}</Date>
        </UserInfo>
      </Member>

      {/* 이미지 */}
      <Tasks tasks={feed.tasks} />

      {/* 리뷰 */}
      <Review>{feed.review}</Review>

      {/* 댓글 */}
      <Comments myLike={feed.myLike} likeCount={feed.likeCount} commentData={feed.comments} reportId={feed.id} />
    </FeedWrap>
  );
}

export default FeedCard;
