import React, { useRef, useEffect } from 'react';
import {
  ChatItemMain,
  ChatItemContent,
  ChatMsg,
  ChatMeta,
  ChatItemSpeaker,
  ChatSpeaker,
  StyledTypeAnimation,
} from './ChatStyle';
import { TypeAnimation } from 'react-type-animation';

// import Avatar from "../chatList/Avatar";

function ChatItem({ animationDelay, role, content, time }) {
  const CURSOR_CLASS_NAME = 'custom-type-animation-cursor';

  return (
    <ChatItemMain
      style={{
        animationDelay: animationDelay,
        flexDirection: role === 'user' ? 'row-reverse' : 'row',
      }}
    >
      <ChatItemSpeaker>
        <img
          src={
            role === 'user'
              ? localStorage.getItem('profileImage')
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjisGy4eY5ZkfsZAmtRQ-4MstK4DapAPegcL52fG10g&s'
          }
          alt="프로필 사진"
        />
      </ChatItemSpeaker>
      <ChatItemContent>
        <ChatSpeaker
          style={{
            justifyContent: role === 'user' ? 'end' : 'start',
          }}
        >
          {role === 'user' ? '나' : '김동료 사원'}
        </ChatSpeaker>
        <ChatMsg>
          {role === 'user' ? (
            <div style={{ whiteSpace: 'pre-line' }}>{content}</div>
          ) : (
            <StyledTypeAnimation
              cursor={false}
              className={CURSOR_CLASS_NAME}
              sequence={[
                content,
                (el) => {
                  el.classList.remove(CURSOR_CLASS_NAME);
                },
              ]}
              wrapper="div"
              omitDeletionAnimation={true}
            />
          )}
        </ChatMsg>
      </ChatItemContent>
      <ChatMeta>
        <div>{time}</div>
      </ChatMeta>
    </ChatItemMain>
  );
}

export default ChatItem;

//<div id={`unusedChatMsg-${index}`}>
