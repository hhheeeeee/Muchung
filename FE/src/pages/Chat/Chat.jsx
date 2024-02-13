import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { BASE_URL } from 'api/config';
import ChatItem from './ChatItem';
import { ChatContent } from './ChatStyle';

function Chat() {
    return (
        <div>
            <ChatContent />
        </div>
    );
}

export default Chat;