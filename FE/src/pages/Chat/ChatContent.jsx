import React, { Component, useState, createRef, useEffect, useRef, useCallback } from 'react';
import { ContentMain, ContentBody, ContentHelper, ContentFooter, UserInput } from './ChatStyle';
import ChatItem from './ChatItem';
import moment from 'moment';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {
  FIRST_SYSTEM_COMMAND,
  FIRST_USER_INPUT_INTRO,
  GET_QUESTIONS_INIT,
  GET_QUESTIONS_MIDDLE,
  GET_RECOMMENDATION,
  GET_SUMMARY,
} from './constants/ChatGptScript';
import { createReportApi, getTaskAndIsCompletedApi, getTextFromChatGpt, postRecommendationApi } from './ChatApi';
import {Link} from "react-router-dom";

function ChatContent() {
  moment.locale('ko'); // 시간 출력 라이브러리 locale 설정

  const [chatItems, setChatItems] = useState([]);
  const [msg, setMsg] = useState('');
  const messagesEndRef = useRef(null);

  // input box나 button 들의 able/disable로 제어
  const [isInputActive, setIsInputActive] = useState({
    textarea: false,
    btnSend: false,
    btnMove: false,
  });

  // 목적: textarea 높이 변화 시 컴포넌트들 높이 계산
  const contentBodyRef = useRef(null);
  const contentFooterRef = useRef(null);
  const textareaRef = useRef(null);

  // 질문 3개씩 챗GPT로부터 가져오기
  const [questionList, setQuestionList] = useState([]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };

  const activateEveryInput = (isActive) => {
    setIsInputActive((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        newState[key] = isActive;
      });
      return newState;
    });
  };

  // chatItems에 msg(현 user input)를 추가한다
  const sendUserInput = () => {
    if (msg !== '') {
      addNewToChatItems({ role: 'user', content: msg });
      setMsg('');
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 채팅 내역에 message 객체(필수 attribute: role, content)를 추가한다.
  const addNewToChatItems = (message) => {
    setChatItems((prevChatItems) => [...prevChatItems, message]);
  };

  const developerCommand = async (cmd) => {
    activateEveryInput(false);
    const response = await getTextFromChatGpt(chatItems.map((item) => ({ role: item.role, content: item.content })));
    // console.log("지피티가 가져온 reponse는..!");
    // console.log(response);

    // 1. 질문 3개 받기
    if (cmd === 'getQuestions') processQuestions(response);
    // 2. 요약
    else if (cmd === 'getSummary') processSummary(response);
    // 3. 추천 업무
    else if (cmd === 'getRecommendation') processRecommendation(response);
    // 4. 뭐지..
    else {
      // ?
    }
  };

  const createReport = async (diary) => {
    await createReportApi(diary); // 실제 서버 통신
    console.log('createReport 서버 통신 : 성공, 종료!');
  };

  const postRecommendation = async (title, reason) => {
    await postRecommendationApi(title, reason); // 실제 서버 통신
    console.log('postRecommendation 서버 통신 : 성공, 종료!');
    window.location.href = "/main/report";
  };

  const processRecommendation = (response) => {
    // 1) JSON 타입이 맞다.
    try {
      const recommendObj = JSON.parse(response);
      // console.log('recommend 나왔당')
      // console.log(recommendObj)

      postRecommendation(
          [recommendObj['rec'][0]['action'], recommendObj['rec'][1]['action'], recommendObj['rec'][2]['action']],
          [recommendObj['rec'][0]['reason'], recommendObj['rec'][1]['reason'], recommendObj['rec'][2]['reason']]
      );
    } catch (e) {
      // 2) JSON 타입이 아니다. -> \n 기준으로 한 줄씩 잘라야 할 듯?
      // TODO
    }
  };

  const processSummary = (response) => {
    // 1) JSON 타입이 맞다.
    try {
      const summaryObj = JSON.parse(response);
      // console.log('썸머리 나왓당')
      // console.log(summaryObj)

      setChatItems((chatItems) => {
        chatItems.pop();
        return [
          ...chatItems,
          {
            role: 'assistant',
            content: summaryObj['feedback'],
          },
          {
            role: 'user',
            content: GET_RECOMMENDATION,
            command: 'getRecommendation',
          },
        ];
      });

      createReport(summaryObj['diary']);
    } catch (e) {
      // 2) JSON 타입이 아니다. \n 기준으로 한 줄씩 자르기.
      console.log('왜 제이슨 아니냐고;');
    }
  };

  // JSON 형식인 respnose를 parse 해서 response, q1, q2, q3으로 만든다.
  // 이걸 questionList에 넣어주고 하나 꺼내서 chatItems에 넣어준다
  const processQuestions = (response) => {
    // 1) JSON 타입이 맞다.
    try {
      const questionObj = JSON.parse(response);
      setQuestionList([questionObj['q3'], questionObj['q2']]);
      setChatItems((chatItems) => {
        chatItems.pop();
        return [
          ...chatItems,
          {
            role: 'assistant',
            content: `${questionObj['reaction'] ? questionObj['reaction'] : ''}\n${questionObj['q1']}`,
            time: moment().format('LT'),
          },
        ];
      });
    } catch (e) {
      // 2) JSON 타입이 아니다. \n 기준으로 한 줄씩 자르기.
      const lines = response.trim().split('\n');
      setChatItems((chatItems) => {
        chatItems.pop();
        return [
          ...chatItems,
          {
            role: 'assistant',
            content: lines.pop(),
            time: moment().format('LT'),
          },
        ];
      });
      setQuestionList((questionList) => {
        questionList = [];
        return lines;
      });
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTaskAndIsCompletedApi();

      if (response) {
        setChatItems((prevChatItems) => [
          ...prevChatItems,
          {
            role: 'system',
            content: FIRST_SYSTEM_COMMAND,
            time: moment().format('LT'),
          },
          {
            role: 'user',
            content: FIRST_USER_INPUT_INTRO + '\n' + response,
            time: moment().format('LT'),
          },
          {
            role: 'user',
            content: GET_QUESTIONS_INIT,
            command: 'getQuestions',
          },
        ]);
      }
    };
    fetchData();

    let requestId; // 스크롤 감지
    // const handleScroll = () => {
    //   const contentBodyBottom = contentBodyRef.current.getBoundingClientRect().bottom;
    //   const messagesEndTop = messagesEndRef.current.getBoundingClientRect().top;
    //   if (contentBodyBottom !== messagesEndTop) {
    //     messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
    //   }
    //   requestId = requestAnimationFrame(handleScroll);
    // };

    // requestId = requestAnimationFrame(handleScroll);

    // 컴포넌트가 언마운트 될 때 ResizeObserver 해지
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []); // 맨 처음 렌더링 될 때

  useEffect(() => {
    if (!chatItems[chatItems.length - 1]) return;

    // 1) 방금 추가된 게: GPT의 질문
    if (chatItems[chatItems.length - 1].role === 'assistant') {
      console.log(`GPT가 당신(실유저)에게 질문을 하겠대`);
      console.log(chatItems);

      activateEveryInput(true);
    }
    // 2) 방금 추가된 게: user의 input -> user는 진짜사용자? 제3자인 나? (intention 구분)
    else if (chatItems[chatItems.length - 1].role === 'user') {
      console.log(`유저가 대답을 던졌도다.`);
      console.log(chatItems);

      const cmd = chatItems[chatItems.length - 1].command;

      // 2-1) 내가 제3자로서 gpt에게 시킴
      if (cmd) {
        developerCommand(cmd);
        return;
      }

      // 2-2) 유저가 그저 gpt 질문에 대답 -> 질문이 떨어졌는가?
      // 2-2-1) 남은 질문이 없어서 다시 질문 받아와야 해
      if (questionList.length === 0) {
        // 남은 질문이 없어서 다시 질문 받아와야 해
        addNewToChatItems({
          role: 'user',
          content: GET_QUESTIONS_MIDDLE,
          command: 'getQuestions',
        });
      }
      // 2-2-2) 다음 질문 보여주고 유저가 대답하길 기다리면 된다
      else {
        setQuestionList((questionList) => {
          const newQuestion = questionList.pop();
          addNewToChatItems({
            role: 'assistant',
            content: newQuestion,
          });
          return questionList;
        });
      }
    }
    // 3) 기타
    else {
      console.log('여긴 머지 ㅋ');
    }
  }, [chatItems]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault(); // 엔터 키의 기본 동작 방지
        sendUserInput();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [msg, chatItems]);

  // useEffect(() => {
  //     // textarea 높이 조절
  //     if (textareaRef && textareaRef.current) {
  //         textareaRef.current.style.height = "0";
  //         const scrollHeight = textareaRef.current.scrollHeight;
  //         textareaRef.current.style.height = scrollHeight + "px";

  //         // 그에 상응하여 body 높이 조절
  //         if (contentBodyRef && contentBodyRef.current && contentFooterRef && contentFooterRef.current) {
  //             const footerHeight = contentFooterRef.current.offsetHeight;
  //             const bodyHeight = (window.innerHeight - footerHeight);
  //             // console.log(`contentFooterRef: ${footerHeight}`);
  //             // console.log(`bodyHeight: ${bodyHeight}`);
  //             // contentBodyRef.current.style.height = bodyHeight + "px";
  //             scrollToBottom();
  //         }
  //     }
  // }, [msg]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const onClickNextActivity = () => {
    addNewToChatItems('user', "Now, ask me questions about other activities I did or didn't do today.", false, true);
  };

  const onClickMove = (e) => {
    addNewToChatItems({
      role: 'user',
      content: GET_SUMMARY,
      command: 'getSummary',
    });
  };

  const onClickSend = (e) => {
    //scrollToBottom2();
    sendUserInput();
  };

  //   const scrollToBottom2 = () => {
  //     nextTick(() => {
  //       contentBodyRef.value.scrollTop = contentBodyRef.value.scrollHeight;
  //     });
  //   };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
      <ContentMain>
        <ContentBody ref={contentBodyRef}>
          {chatItems
              .filter((item) => (item['role'] === 'user' && !item['command']) || item['role'] === 'assistant')
              .map((chatItem, index) => (
                  <ChatItem
                      key={index}
                      animationDelay={index + 2}
                      role={chatItem.role}
                      content={chatItem.content}
                      time={chatItem.time}
                  />
              ))}
          <div ref={messagesEndRef} />
        </ContentBody>
        <ContentFooter ref={contentFooterRef}>
          <ContentHelper btnmove={isInputActive['btnMove']}>
            <button onClick={onClickMove}>오늘 하루를 마무리할게요.</button>
          </ContentHelper>
          <UserInput>
          <textarea
              type="text"
              placeholder={isInputActive['textarea'] ? '오늘 나의 하루는..' : '잠시만 기다려주세요...'}
              ref={textareaRef}
              onChange={onStateChange}
              value={msg}
              rows={1}
              readOnly={!isInputActive['textarea']}
              style={{ backgroundColor: isInputActive['textarea'] ? 'pink' : 'lightgrey' }}
          />
            <div>
              <IconButton
                  color="primary"
                  aria-label="답변 입력하기"
                  disabled={!isInputActive['btnSend']}
                  onClick={onClickSend}
              >
                <SendIcon />
              </IconButton>
            </div>
          </UserInput>
        </ContentFooter>
      </ContentMain>
  );
}

export default ChatContent;
