/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { BASE_URL } from 'api/config';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from 'store/taskListSlice';

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
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogActions from '@mui/joy/DialogActions';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { deleteTask } from 'store/taskListSlice';
import { set } from 'date-fns';

const MainTodo = () => {
  //서버에서 현재 로그인한 유저의 아이디를 바탕으로 해당 유저의 오늘 날짜 투두리스트 데이터를 모두 가져옴
  //그 투두리스트의 데이터를 목록으로 보여준다.
  //그리고 투두리스트를 추가하거나 삭제할 수 있다.
  //투두리스트를 추가하거나 삭제할 때마다 서버에 반영된다.
  //투두리스트를 추가하거나 삭제할 때마다 목록을 다시 불러와서 반영한다.
  //투두리스트에서 이미지 업로드 버튼을 누르면 이미지 업로드 모달이 뜨고 이미지를 업로드하면 제출 여부가 체크되고 이미지가 업로드된다.

  const [dailytaskList, setDailytaskList] = useState([]); //데일리 투두리스트 데이터(id, title, isCompleted)를 담을 배열
  const [selectedImage, setSelectedImage] = useState(null); //이미지 업로드 모달에서 선택한 이미지 파일의 url
  const [selectedImageId, setSelectedImageId] = useState(null); //이미지 업로드 모달에서 선택한 이미지 파일의 id

  const [task, setTask] = useState(''); //새로운 투두리스트를 추가할 때 사용자가 입력한 투두리스트 제목
  const [modalTaskId, setModalTaskId] = useState(null); // 삭제 모달에서 사용할 task.id

  const [showImageModal, setShowImageModal] = useState(false); //이미지 업로드 모달을 띄울지 말지 결정하는 상태
  const [deleteModal, setDeleteModal] = useState(false); //삭제 모달을 띄울지 말지 결정하는 상태

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.token); //현재 로그인한 유저의 토큰   (임시)

  const [showImageuploadCompleteModal, setShowImageuploadCompleteModal] = useState(false); //이미지 업로드 완료 모달을 띄울지 말지 결정하는 상태

  // 선택한 날짜가 있을 경우 그 날짜에 해당하는 투두리스트 데이터를 불러온다.
  useEffect(() => {
    if (accessToken === 'null') {
      return;
    }
    const fetchData = async () => {
      try {
        const Dailytasksres = await axios.get(`${BASE_URL}/tasks/daily`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const dailytasksdata = Dailytasksres.data;
        setDailytaskList(dailytasksdata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch, accessToken]);

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
    setSelectedImage(file); // 선택한 이미지 파일을 상태에 저장
  };

  const handleFileUpload = async (taskId) => {
    console.log('taskId', taskId);
    try {
      // 이미지 서버에 업로드
      const formData = new FormData(); // FormData 객체 생성
      formData.append('file', selectedImage); // 파일 추가

      const uploadedImageRes = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('uploadedImageRes', uploadedImageRes);
      const uploadedImage = uploadedImageRes.data;
      console.log('uploadedImage', uploadedImage);

      await axios.post(
        `${BASE_URL}/tasks/${taskId}/complete`,
        { image: uploadedImage },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (selectedImage) {
        console.log('이미지 업로드됨:', selectedImage);
      } else {
        console.log('선택된 이미지가 없습니다');
      }
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
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const newId = response.data.id; // 서버에서 반환한 새 작업의 ID
      const title = response.data.title; // 서버에서 반환한 새 작업의 제목
      const isCompleted = response.data.isCompleted; // 서버에서 반환한 새 작업의 완료 여부
      const completionImage = response.data.completionImage; // 서버에서 반환한 새 작업의 완료 이미지
      const newTask = {
        id: newId,
        title: title,
        isCompleted: isCompleted,
        completionImage: completionImage,
      }; // 새 작업 객체 생성
      dispatch(addTask(newTask)); // 리덕스 스토어에 데이터 추가

      // 새로운 작업을 추가한 후 업데이트된 작업 목록을 불러오기
      const updatedTaskListRes = await axios.get(`${BASE_URL}/tasks/daily`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedTaskList = updatedTaskListRes.data;
      setDailytaskList(updatedTaskList);

      dispatch(addTask(updatedTaskList)); // 리덕스 스토어에 데이터 추가 (업데이트된 작업 목록으로

      setTask(''); //새 작업을 추가한 후 작업 상태를 초기화
    } catch (error) {
      console.error('데이터를 추가하는 중 에러 발생:', error);
    }
  };

  // useMemo를 사용하여 렌더링 최적화
  // useMemo는 해당 값이 변경되지 않는 한 이전에 계산된 값을 재사용하는 데 사용

  const memoizedTaskInput = useMemo(
    () => <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />,
    [task]
  );

  return (
    <div>
      <h1>Todo List</h1>
      <div css={list}>
        {/* 등록한 업무들 */}
        {dailytaskList.map((task) => (
          <div key={task.id} css={taskItem}>
            {task.isCompleted ? (
              <CheckBoxIcon sx={{ color: blue[900] }} />
            ) : (
              <CheckBoxOutlineBlankIcon sx={{ color: blue[900] }} />
            )}
            <span className="task-title">{task.title}</span>

            <div
              className={`image-button ${task.isCompleted ? 'disabled' : ''}`}
              onClick={() => {
                setShowImageModal(true);
                setSelectedImage(task.image);
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
                          <img src={selectedImage} alt="task" />

                          {/* 이미 업로드한 이미지가 있다면 미리보기 추가 */}
                          {task.completionImage && (
                            <div>
                              <h3>이미 업로드한 이미지</h3>
                              <img src={task.completionImage} alt="uploaded-task" />
                            </div>
                          )}
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

      <div css={submit}>
        {memoizedTaskInput}
        <div
          className="submit-button"
          onClick={() => {
            handleAddTask(task);
            setTask('');
          }} //새로운 투두리스트 추가
        >
          <SendIcon sx={{ color: blue[900] }} />
        </div>
      </div>
    </div>
  );
};

export default MainTodo;

const list = css`
  padding: 0;
  list-style: none;
  margin: 0;
  max-height: 300px;
  overflow: scroll;
`;

const buttonAlign = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const taskItem = css`
  display: grid;
  grid-template-columns: 1fr 10fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;

  .checkbox {
    grid: 1;
    margin-right: 10px;
  }
  .task-title {
    grid: 2;
  }

  .image-button {
    grid: 3;
    cursor: pointer;
  }
  .image-button.disabled {
    pointer-events: none;
    opacity: 0.5; /* 또는 다른 비활성화 효과를 원하는대로 설정 */
  }
  .delete-button {
    grid: 4;
    cursor: pointer;
  }
`;

const submit = css`
  display: grid;
  grid-template-columns: 9fr 1fr;
  justify-content: space-between;
  align-items: center;

  .submit-button {
    padding-left: 2px;
  }
`;
