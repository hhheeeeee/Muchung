/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@mui/joy/Button';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { BASE_URL } from 'api/config';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from 'store/taskListSlice';
import { setTaskList } from 'store/taskListSlice';

import { blue } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { Transition } from 'react-transition-group';
import Divider from '@mui/joy/Divider';
import DialogActions from '@mui/joy/DialogActions';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { deleteTask } from 'store/taskListSlice';
import { set } from 'date-fns';
////////////////////////////
import tieperson from '../../assets/background/tieperson.png';
import taskregist from '../../assets/background/taskregist.png';
import { Box } from '@mui/material';
import { useRef } from 'react';
import RecommendButton from './RecommendButton';
import MissionClear from './MissionClear';

const MainTodo = () => {
  //서버에서 현재 로그인한 유저의 아이디를 바탕으로 해당 유저의 오늘 날짜 투두리스트 데이터를 모두 가져옴
  //그 투두리스트의 데이터를 목록으로 보여준다.
  //그리고 투두리스트를 추가하거나 삭제할 수 있다.
  //투두리스트를 추가하거나 삭제할 때마다 서버에 반영된다.
  //투두리스트를 추가하거나 삭제할 때마다 목록을 다시 불러와서 반영한다.
  //투두리스트에서 이미지 업로드 버튼을 누르면 이미지 업로드 모달이 뜨고 이미지를 업로드하면 제출 여부가 체크되고 이미지가 업로드된다.

  const [dailytaskList, setDailytaskList] = useState([]); //데일리 투두리스트 데이터(id, title, isCompleted)를 담을 배열
  const [selectedImage, setSelectedImage] = useState(null); //이미지 업로드 모달에서 선택한 이미지 파일의 url

  const [task, setTask] = useState(''); //새로운 투두리스트를 추가할 때 사용자가 입력한 투두리스트 제목
  const [modalTaskId, setModalTaskId] = useState(null); // 삭제 모달에서 사용할 task.id

  const [showImageModal, setShowImageModal] = useState(false); //이미지 업로드 모달을 띄울지 말지 결정하는 상태
  const [deleteModal, setDeleteModal] = useState(false); //삭제 모달을 띄울지 말지 결정하는 상태
  const [isFocused, setIsFocused] = useState(false); // input에 포커스가 되었는지 여부

  const dispatch = useDispatch();

  const [accessToken] = useState(localStorage.getItem('token'));

  const [showImageuploadCompleteModal, setShowImageuploadCompleteModal] = useState(false); //이미지 업로드 완료 모달을 띄울지 말지 결정하는 상태

  const sendIconRef = useRef(null);
  const inputRef = useRef(null);

  const fetchData = async () => {
    try {
      const Dailytasksres = await axios.get(`${BASE_URL}/tasks/daily`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const dailytasksdata = Dailytasksres.data;
      setDailytaskList(dailytasksdata);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // 선택한 날짜가 있을 경우 그 날짜에 해당하는 투두리스트 데이터를 불러온다.
  useEffect(() => {
    if (accessToken === 'null') {
      return;
    }
    fetchData();
  }, [showImageuploadCompleteModal, isFocused]);

  console.log('dailytaskList', dailytaskList);

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const updatedTaskList = dailytaskList.filter((task) => task.id !== id);
      setDailytaskList(updatedTaskList);

      // 리덕스 스토어에서 데이터 삭제
      dispatch(deleteTask(id));
    } catch (error) {
      console.error('데이터를 삭제하는 중 에러 발생:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // reader.result에는 파일의 데이터 URL이 들어 있습니다.
        const imageUrl = reader.result;

        // 선택한 이미지 파일과 변환된 데이터 URL을 상태에 저장
        setSelectedImage({
          file: file,
          imageUrl: imageUrl,
        });
      };

      // 파일을 읽어와서 데이터 URL로 변환합니다.
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async (taskId) => {
    console.log('taskId', taskId);
    try {
      // 이미지 서버에 업로드
      const formData = new FormData(); // FormData 객체 생성
      formData.append('file', selectedImage.file); // 파일 추가

      const uploadedImageRes = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const uploadedImage = uploadedImageRes.data;

      await axios.post(
        `${BASE_URL}/tasks/${taskId}/complete`,
        { image: uploadedImage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {
      console.error('이미지를 업로드하는 중 에러 발생:', error);
    }
    setSelectedImage(null);
  };

  const handleAddTask = async (title) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/tasks`,
        {
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const newId = response.data.id; // 서버에서 반환한 새 작업의 ID
      const newTitle = response.data.title; // 서버에서 반환한 새 작업의 제목
      const isCompleted = response.data.isCompleted; // 서버에서 반환한 새 작업의 완료 여부
      const completionImage = response.data.completionImage; // 서버에서 반환한 새 작업의 완료 이미지
      const newTask = {
        id: newId,
        title: newTitle,
        isCompleted: isCompleted,
        completionImage: completionImage,
      }; // 새 작업 객체 생성
      dispatch(addTask(newTask)); // 리덕스 스토어에 데이터 추가

      // 새로운 작업을 추가한 후 업데이트된 작업 목록을 불러오기
      const updatedTaskListRes = await axios.get(`${BASE_URL}/tasks/daily`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const updatedTaskList = updatedTaskListRes.data;
      setDailytaskList(updatedTaskList);

      dispatch(setTaskList(updatedTaskList)); // 리덕스 스토어에 데이터 추가 (업데이트된 작업 목록으로

      setTask(''); //새 작업을 추가한 후 작업 상태를 초기화
    } catch (error) {
      console.error('데이터를 추가하는 중 에러 발생:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (
      inputRef.current &&
      sendIconRef.current &&
      !inputRef.current.contains(event.target) &&
      !sendIconRef.current.contains(event.target)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const [isTranslated, setIsTranslated] = useState(false);

  const handleImageClick = () => {
    setIsTranslated(!isTranslated);
  };

  const addNewTask = (newValue) => {
    fetchData();
  };
  const speech = ['환영합니다 무청컴퍼니입니다.', '도움이 필요하면 클릭해주세요'];
  const [currentSpeech, setCurrentSpeech] = useState(0);
  const [isFadeOut, setIsFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadeOut(true); // 페이드 아웃 효과를 위해 isFadeOut 상태를 true로 설정
      setTimeout(() => {
        setCurrentSpeech((prevSpeech) => (prevSpeech === 0 ? 1 : 0));
        setIsFadeOut(false); // 페이드 인 효과를 위해 isFadeOut 상태를 false로 설정
      }, 500); // 0.5초 후에 currentSpeech 상태를 변경하여 페이드 인 효과 적용
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div css={container}>
      {/* 여기 240215 추가됨 */}
      {isTranslated ? (
        <div css={speechbubblenot}>
          <div className={`speech-bubble ${isFadeOut ? 'fade-out' : ''}`} onAnimationEnd={() => setIsFadeOut(false)}>
            <p className="text" key={currentSpeech}>
              blank
            </p>
          </div>
        </div>
      ) : (
        <div css={speechbubble}>
          <div className={`speech-bubble ${isFadeOut ? 'fade-out' : ''}`} onAnimationEnd={() => setIsFadeOut(false)}>
            <p className="text" key={currentSpeech}>
              {speech[currentSpeech]}
            </p>
          </div>
        </div>
      )}
      <div
        css={css`
          ${image};
        `}
      >
        {isTranslated && <RecommendButton Todolist={dailytaskList} onChange={addNewTask} />}

        <img src={tieperson} alt="person" className="personimg" onClick={handleImageClick} />
        {isTranslated && <MissionClear />}
      </div>

      <div>
        <img src={taskregist} alt="taskregist" width="100%" className="taskregistration" />
      </div>
      <div css={submit}>
        <input
          className="taskinput"
          ref={inputRef}
          css={todoinput}
          placeholder="오늘의 업무를 등록해주세요!"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onFocus={() => setIsFocused(true)} // input에 포커스가 되었을 때 isFocused 상태 변경
          // onBlur={() => setIsFocused(false)} // input에 포커스가 해제되었을 때 isFocused 상태 변경
        />
        {isFocused && (
          <div
            ref={sendIconRef} // ref 설정
            className="submit-button"
            onClick={() => {
              handleAddTask(task);
              setIsFocused(false);
              setTask('');
            }}
          >
            <SendIcon sx={{ color: blue[900] }} fontSize="large" />
          </div>
        )}
        {/* <img src={tieperson} alt="person" /> */}
      </div>

      <div css={list}>
        {/* 등록한 업무들 */}
        {dailytaskList.map((task) => (
          <div key={task.id} css={taskcontainer}>
            {task.isCompleted ? (
              <CheckBoxIcon fontSize="large" sx={{ color: blue[900] }} />
            ) : (
              <CheckBoxOutlineBlankIcon fontSize="large" sx={{ color: blue[900] }} />
            )}
            <div css={taskItem}>
              <span className="task-title">{task.title}</span>
              <div
                className={`image-button ${task.isCompleted ? 'disabled' : ''}`}
                onClick={() => {
                  setShowImageModal(true);
                  // setSelectedImage(task.image);
                  setModalTaskId(task.id);
                }}
              >
                <PhotoCameraBackIcon sx={{ color: blue[900] }} />
              </div>
              <div className={`image-button ${task.isCompleted ? 'disabled' : ''}`}>
                <DeleteIcon
                  onClick={() => {
                    setDeleteModal(true);
                    // 모달이 열릴 때 해당 task.id 설정
                    setModalTaskId(task.id);
                  }}
                  sx={{ color: blue[900] }}
                />
              </div>
            </div>
          </div>
        ))}

        {/* 이미지 업로드 모달 */}
        {showImageModal && (
          <Transition in={showImageModal} timeout={400}>
            {(state) => (
              <Modal
                keepMounted
                open={!['exited', 'exiting'].includes(state)}
                onClose={() => setShowImageModal(false)}
                slotProps={{
                  backdrop: {
                    sx: {
                      opacity: 0,
                      backdropFilter: 'none',
                      transition: `opacity 400ms, backdrop-filter 400ms`,
                      ...{
                        entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                        entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                      }[state],
                    },
                  },
                }}
                sx={{
                  visibility: state === 'exited' ? 'hidden' : 'visible',
                }}
              >
                <ModalDialog
                  sx={{
                    opacity: 0,
                    transition: `opacity 300ms`,
                    ...{
                      entering: { opacity: 1 },
                      entered: { opacity: 1 },
                    }[state],
                  }}
                >
                  <DialogTitle>이미지 첨부</DialogTitle>
                  <DialogContent>
                    <div>
                      <input type="file" onChange={(e) => handleFileChange(e)} />

                      {selectedImage && (
                        <>
                          <img src={selectedImage.imageUrl} alt="task" />
                        </>
                      )}
                      <div css={buttonAlign}>
                        {/* 이미지 업로드 시 해당 task.id 사용 */}
                        <ArrowUpwardIcon
                          onClick={() => {
                            handleFileUpload(modalTaskId);
                            setShowImageModal(false);
                            setShowImageuploadCompleteModal(true);
                          }}
                        />
                        <CloseIcon onClick={() => setShowImageModal(false)} />
                      </div>
                    </div>
                  </DialogContent>
                </ModalDialog>
              </Modal>
            )}
          </Transition>
        )}

        {showImageuploadCompleteModal && (
          <Modal open={showImageuploadCompleteModal} onClose={() => setShowImageuploadCompleteModal(false)}>
            <ModalDialog variant="outlined">
              <DialogTitle>업로드 완료</DialogTitle>
              <DialogContent>이미지 업로드가 완료되었습니다.</DialogContent>
              <DialogActions>
                <CheckIcon
                  onClick={() => {
                    setShowImageuploadCompleteModal(false);
                    setShowImageModal(false);
                  }}
                />
              </DialogActions>
            </ModalDialog>
          </Modal>
        )}

        {/* 삭제 모달 */}

        {deleteModal && (
          <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
              <DialogTitle>
                <WarningRoundedIcon />
                경고
              </DialogTitle>
              <Divider />
              <DialogContent>정말로 삭제하시겠습니까?</DialogContent>
              <DialogActions>
                <CloseIcon onClick={() => setDeleteModal(false)} />
                <CheckIcon
                  onClick={() => {
                    handleDeleteTask(modalTaskId);
                    setDeleteModal(false);
                  }}
                />
              </DialogActions>
            </ModalDialog>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MainTodo;

const container = css`
  height: 100%;
  padding: 0rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .personimg {
    margin-top: 1rem;
  }

  .taskregistration {
    margin-bottom: 0.5rem;
  }
`;

const list = css`
  width: 100%;
  padding: 0;
  list-style: none;
  margin: 0;
  max-height: 50dvh;
  overflow: scroll;
`;

const buttonAlign = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const taskcontainer = css`
  display: grid;
  grid-template-columns: 1fr 11fr;
  align-items: center;
  justify-content: space-between;

  .checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
`;

const taskItem = css`
  display: grid;
  grid-template-columns: 15fr 2fr 2fr;
  align-items: center;
  padding: 0.7rem;
  margin: 0.5rem 0rem;
  background-color: aliceblue;
  border-radius: 10px;

  .task-title {
    grid: 1;
  }

  .image-button {
    grid: 2;
    cursor: pointer;
  }
  .image-button.disabled {
    pointer-events: none;
    opacity: 0.5; /* 또는 다른 비활성화 효과를 원하는대로 설정 */
  }
  .delete-button {
    grid: 3;
    justify-content: end; // 오른쪽 정렬
    cursor: pointer;
  }
`;

const submit = css`
  display: grid;
  grid-template-columns: 9fr 1fr;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #113d60;
  color: #113d60;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 0.3rem;

  .submit-button {
    margin-right: 0.5rem;
  }

  .submit-button:hover > svg {
    color: rgb(11, 56, 124);
    transform: scale(1.1);
  }

  .taskinput {
    border: none;
  }
`;

const image = css`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  img {
    min-height: 50px;
    width: 50%;
    height: auto;
    object-fit: cover;
  }
`;

// const backside = css`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   justify-content: center;
//   align-items: center;
//   transform: rotateY(180deg);
//   backface-visibility: visible;
//   pointer-events: none; // Allow clicks to pass through to the underlying image
//   color: white; // Adjust text color on the backside as needed

//   div {
//     color: #113d60;
//     font-size: 20px;
//     background-color: #e3eef4;
//     border: 1px solid #e3eef4;
//   }
// `;

const todoinput = css`
  padding: 10px;
  margin: 5px;
  font-size: 20px;
  border: 1px solid #e3eef4;

  &:focus {
    outline: none;
  }
`;

const speechbubble = css`
  margin-top: 0.5rem;
  width: 85%;

  .speech-bubble {
    position: relative;
    background: #09324b;
    border-radius: 0.4em;
    padding: 0.6rem;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  .speech-bubble:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 0.844em solid transparent;
    border-top-color: #09324b;
    border-bottom: 0;
    margin-left: -0.844em;
    margin-bottom: -0.744em;
  }

  .fade-out {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .text {
    text-align: center;
    font-size: 1.3rem;
    color: white;
  }
`;

const speechbubblenot = css`
  margin-top: 0.5rem;
  width: 85%;

  .speech-bubble {
    position: relative;
    background: white;
    border-radius: 0.4em;
    padding: 0.6rem;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  .speech-bubble:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 0.844em solid transparent;
    border-top-color: white;
    border-bottom: 0;
    margin-left: -0.844em;
    margin-bottom: -0.744em;
  }

  .fade-out {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .text {
    text-align: center;
    font-size: 1.3rem;
    color: white;
  }
`;
