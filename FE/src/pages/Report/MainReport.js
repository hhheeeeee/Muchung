//메인화면에서 오늘 할일 등록 하는 컴포넌트임

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setTaskList } from "store/taskListSlice";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "api/config";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { set } from "date-fns";

import { setToken } from "../../store/tokenSlice";

const MainReport = () => {
  //서버에서 현재 로그인한 유저의 아이디를 바탕으로 해당 유저의 데일리 투두리스트 데이터를 모두 가져옴
  //그 투두리스트의 데이터를 목록으로 보여준다.
  //그리고 투두리스트를 추가하거나 삭제할 수 있다.
  //투두리스트를 추가하거나 삭제할 때마다 서버에 반영된다.
  //투두리스트를 추가하거나 삭제할 때마다 목록을 다시 불러와서 반영한다.
  //투두리스트에서 이미지 업로드 버튼을 누르면 이미지 업로드 모달이 뜨고 이미지를 업로드하면 제출 여부가 체크되고 이미지가 업로드된다.

  const [dailytaskList, setDailytaskList] = useState([]); //데일리 투두리스트 데이터(id, title, isCompleted)를 담을 배열

  const [task, setTask] = useState(""); //새로운 투두리스트를 추가할 때 사용자가 입력한 투두리스트 제목
  const [selectedImage, setSelectedImage] = useState(null); //이미지 업로드 모달에서 선택한 이미지 파일

  const [showImageModal, setShowImageModal] = useState(false); //이미지 업로드 모달을 띄울지 말지 결정하는 상태

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.token); //현재 로그인한 유저의 토큰   (임시)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenRes = await axios.get(`${BASE_URL}/token`);
        const token = tokenRes.data; // 서버에서 받아온 토큰
        dispatch(setToken(token)); // 토큰을 리덕스 스토어에 저장
        const dailytasklistres = await axios.get(`${BASE_URL}/tasks/daily`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const tasklists = dailytasklistres.data;
        console.log(tasklists);
        setDailytaskList(tasklists); // 서버에서 받아온 투두리스트 목록을 상태에 저장
      } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      }
    };
    fetchData();
  }, [dispatch, accessToken]);

  const handleAddTask = async () => {
    if (task.trim() !== "") {
      try {
        // 서버에 새로운 업무 등록
        const taskres = await axios.post(`${BASE_URL}/tasks`, {
          title: task,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const newtask = taskres.data;
        setDailytaskList((dailytaskList) => {
          if (Array.isArray(newtask)) {
            return [...dailytaskList, ...newtask];
          } else {
            // tasklists가 배열이 아닌 경우에 대한 처리
            console.error("tasklists is not an array:", newtask);
            return dailytaskList; // 또는 다른 적절한 값
          }
        });
      } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      }
    }
  };

  const handleCancelTask = () => {
    resetModalState();
  };

  const handleDeleteTask = async (index) => {
    try {
      const taskres = await axios.delete(
        `${BASE_URL}/tasks/${dailytaskList[index].id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("데이터를 불러오는 중 에러 발생:", error);
    }
  };

  const handleImageFileSelect = (e) => {
    const imagefile = e.target.files[0];

    // 이미지 파일이 맞는지 확인
    if (imagefile && imagefile.type.substr(0, 5) === "image") {
      setSelectedImage(imagefile);
    } else {
      alert("이미지 파일을 선택해주세요.");
    }
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  const handleOpenImageModal = () => {
    setShowImageModal(true);
  };

  const resetModalState = () => {
    setTask("");
  };

  const todayDate = new Date().toLocaleDateString();

  const handleSubmitImage = async (taskindex) => {
    try {
      const taskId = dailytaskList[taskindex].id;
      const response = await axios.post(
        `${BASE_URL}/tasks/${taskId}/complete`,
        {
          image: selectedImage,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      setSelectedImage(null);
      setShowImageModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div css={container}>
        <div css={box1}>
          {todayDate} 의 업무 등록
          {/* <div onClick={() => setShowModal(true)}> &nbsp; ➕</div> */}
        </div>

        <div css={box2}>
          {dailytaskList ? (
            <div>
              <ul>
                {dailytaskList.map((task, index) => (
                  <li css={list} key={index}>
                    <div className="status">
                      {task && task.isCompleted ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                    </div>
                    <div className="task">{task}</div>
                    {/* <div onClick={() => handleDeleteTask(index)}>삭제</div> */}
                    <div className="upload-button">
                      <button
                        className="button"
                        onClick={() => handleOpenImageModal(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          viewBox="0 0 24 24"
                          height="24"
                          fill="none"
                          className="svg-icon"
                        >
                          <g
                            strokeWidth={2}
                            strokeLinecap="round"
                            stroke="#fff"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          >
                            <path d="m4 9c0-1.10457.89543-2 2-2h2l.44721-.89443c.33879-.67757 1.03131-1.10557 1.78889-1.10557h3.5278c.7576 0 1.4501.428 1.7889 1.10557l.4472.89443h2c1.1046 0 2 .89543 2 2v8c0 1.1046-.8954 2-2 2h-12c-1.10457 0-2-.8954-2-2z"></path>
                            <path d="m15 13c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3431-3 3-3 3 1.3431 3 3z"></path>
                          </g>
                        </svg>
                      </button>
                    </div>
                    <Modal
                      open={showImageModal}
                      onClose={handleCloseImageModal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          이미지 등록 모달임
                        </Typography>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileSelect}
                          />
                          {selectedImage && (
                            <div>
                              <p>Selected Image: {selectedImage.name}</p>
                              {/* 이미지 파일에 대한 추가 UI 또는 업로드 로직을 여기에 추가할 수 있습니다. */}
                            </div>
                          )}
                        </div>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          여기서 이미지 업로드하면 iscompleted true로 바꿔주고
                          이미지 업로드한거 보여주면 됨
                        </Typography>
                        <Button onClick={handleSubmitImage}>등록</Button>
                        <Button onClick={handleCloseImageModal}>닫기</Button>
                      </Box>
                    </Modal>

                    <div className="delete-button">
                      <button
                        className="button"
                        onClick={() => handleDeleteTask(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 69 14"
                          className="svgIcon bin-top"
                        >
                          <g clipPath="url(#clip0_35_24)">
                            <path
                              fill="black"
                              d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_35_24">
                              <rect fill="white" height="14" width="69"></rect>
                            </clipPath>
                          </defs>
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 69 57"
                          className="svgIcon bin-bottom"
                        >
                          <g clipath="url(#clip0_35_22)">
                            <path
                              fill="black"
                              d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_35_22">
                              <rect fill="white" height="57" width="69"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                      {/* <DeleteButton onClick={() => handleDeleteTask(index)} /> */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>오늘의 업무 등록하기 </div>
          )}
          <div css={workinput}>
            <input
              className="input"
              name="text"
              placeholder="업무를 입력하세요..."
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />

            <div onClick={handleAddTask}>
              <button>
                <span className="button_top"> 등록</span>
              </button>
            </div>

            <div onClick={handleCancelTask}>
              <button>
                <span className="button_top"> 취소</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainReport;

// Emotion CSS Styles
const modal = css`
  position: fixed; // 화면 스크롤에 따라 같이 움직이지 않음
  top: 50%; // 화면 세로축 기준으로 50% 위치
  left: 50%; // 화면 가로축 기준으로 50% 위치
  transform: translate(-50%, -50%); // 위 두 줄로 화면 중앙에 위치
`;

const container = css`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 9fr; /* 두 개의 행을 자동으로 크기 조절 */
`;

const box1 = css`
  font-size: 0.8rem;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  // padding: 1rem;
  border-bottom: 1px solid #93b4f3;
`;

const box2 = css`
  border: 1px solid #f7f7f7;
  border-radius: 10px;
  margin: 1rem;
  display: grid;
  grid-template-rows: 5fr 1fr; /* 두 개의 행을 자동으로 크기 조절 */
`;

const workinput = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;

  .input {
    max-width: 100%;
    background-color: #c8deff;
    color: #242424;
    padding: 0.15rem 0.5rem;
    min-height: 60%;
    border-radius: 4px;
    outline: none;
    border: none;
    line-height: 1.15;
    box-shadow: 0px 10px 20px -18px;
  }

  input:focus {
    border-bottom: 2px solid #5a83c8;
    border-radius: 4px 4px 2px 2px;
  }

  input:hover {
    outline: 1px solid #93b4f3;
  }

  button {
    /* Variables */
    --button_radius: 0.75em;
    --button_color: #c8deff;
    --button_outline_color: #000000;
    font-size: 10px;
    font-weight: bold;
    border: none;
    border-radius: var(--button_radius);
    background: var(--button_color);
  }

  .button_top {
    display: block;
    box-sizing: border-box;
    width: 60px; /* This includes padding and border */
    padding: 5px;
    border: 1px solid #000;
    border: 2px solid var(--button_outline_color);
    border-radius: var(--button_radius);
    padding: 0.75em 1.5em;
    background: var(--button_color);
    color: var(--button_outline_color);
    transform: translateY(-0.2em);
    transition: transform 0.1s ease;
  }

  button:hover .button_top {
    /* Pull the button upwards when hovered */
    transform: translateY(-0.33em);
  }

  button:active .button_top {
    /* Push the button downwards when pressed */
    transform: translateY(0);
  }
`;

const list = css`
  display: grid;
  grid-template-columns: 1fr 8fr 1.5fr 1.5fr; /* 네 열로 자동으로 크기 조절 */
  align-items: center;

  li {
    display: grid;
    grid-template-columns: 1fr 9fr 1fr 1fr; /* 각 li 내에서도 네 열로 자동으로 크기 조절 */
    align-items: center;
    border-bottom: 1px solid #000;
    padding: 0.5rem;
  }

  .status {
    /* 첫 번째 열 (제출/미제출) 스타일 */
    grid-column: 1 / 2;
  }

  .task {
    /* 두 번째 열 (업무) 스타일 */
    grid-column: 2 / 3;
  }

  .upload-button {
    /* 세 번째 열 (이미지 올리기 버튼) 스타일 */
    grid-column: 3 / 4;
    cursor: pointer;
    color: blue;
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 9px 12px;
      gap: 8px;
      height: 40px;
      width: 40px;
      border: none;
      background: #000;
      border-radius: 20px;
      cursor: pointer;
    }

    .lable {
      line-height: 22px;
      font-size: 17px;
      color: #fff;
      font-family: sans-serif;
      letter-spacing: 1px;
    }

    .button:hover {
      background: #e52441;
    }

    .button:hover .svg-icon {
      animation: flickering 2s linear infinite;
    }

    @keyframes flickering {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 1;
      }

      52% {
        opacity: 1;
      }

      54% {
        opacity: 0;
      }

      56% {
        opacity: 1;
      }

      90% {
        opacity: 1;
      }

      92% {
        opacity: 0;
      }

      94% {
        opacity: 1;
      }

      96% {
        opacity: 0;
      }

      98% {
        opacity: 1;
      }

      99% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }

  .delete-button {
    /* 네 번째 열 (삭제 버튼) 스타일 */
    grid-column: 4 / 5;
    cursor: pointer;
    color: red;

    .button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgb(20, 20, 20);
      border: none;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
      cursor: pointer;
      transition-duration: 0.3s;
      overflow: hidden;
      position: relative;
      gap: 2px;
    }

    .svgIcon {
      width: 12px;
      transition-duration: 0.3s;
    }

    .svgIcon path {
      fill: white;
    }

    .button:hover {
      transition-duration: 0.3s;
      background-color: rgb(255, 69, 69);
      align-items: center;
      gap: 0;
    }

    .bin-top {
      transform-origin: bottom right;
    }
    .button:hover .bin-top {
      transition-duration: 0.5s;
      transform: rotate(160deg);
    }
  }
`;
