import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'api/config';
import ChatItem from './ChatItem';
import ChatContent from './ChatContent';

function Chat() {
  return (
    <div>
      야이바보
      <ChatContent></ChatContent>
    </div>
  );
}

export default Chat;
