import React, { useEffect, useState, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { BASE_URL } from 'api/config';
import { useSelector, useDispatch } from 'react-redux';

//picture
import noimage from '../../assets/background/noimage.jpg';

//redux
import { setReview } from 'store/reviewSlice';

////mui
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { List, ListItem } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import TextField from '@mui/material/TextField';
import AspectRatio from '@mui/joy/AspectRatio';
import ListDivider from '@mui/joy/ListDivider';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import Icon from '@mui/material/Icon';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const Dailyreport = () => {
  // 업무 목록을 저장
  const [taskList, setTaskList] = useState([]);
  //선택한 업무의 아이디 저장
  const [selectedTaskId, setSelectedTaskId] = useState('');
  // //선택한 업무의 이미지 url
  const [selectedTaskImage, setSelectedTaskImage] = useState('');
  // //선택한 업무
  const [selectedTaskTitle, setSelectedTaskTitle] = useState('');
  //선택한 업무를 보여줄지 여부
  const [showtask, setShowtask] = useState(false);
  // 한 줄 리뷰를 저장
  const [oneLineReview, setOneLineReview] = useState('');
  const accessToken = localStorage.getItem('token'); // 로컬 스토리지에서 액세스 토큰을 가져옴
  //사용자 정보
  const [userInfo, setUserInfo] = useState('');
  //보고서 정보
  const [reportInfo, setReportInfo] = useState('');
  //데일리 리뷰
  const [dailyReview, setDailyReview] = useState('');
  //submit 모달의 오픈 여부
  const [open, setOpen] = useState(false);
  //이름 확인시 입력값
  const [inputValue, setInputValue] = useState('');
  //진행도 저장
  const [progress, setProgress] = useState(0);

  //리덕스에서 사용자 정보 가져오기
  const dispatch = useDispatch(); //dispatch를 사용하기 위한 변수
  const submittedReview = useSelector((state) => state.review); //리덕스에서 제출된 리뷰 가져오기 payload에 저장된 리뷰 가져오기

  const reviewInputRef = useRef();

  //첫 마운트시, accessToken이 변경될 때마다 실행
  useEffect(() => {
    if (accessToken === null) {
      return;
    }

    //오늘 날짜를 가져옴
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1 > 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
    const day = today.getDate();

    //마운트 시 필요한 데이터 가져오는 함수
    const fetchData = async () => {
      try {
        const userres = await axios.get(`${BASE_URL}/member/memberInfo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserInfo(userres.data); //사용자 정보 저장

        const tasksres = await axios.get(`${BASE_URL}/tasks/daily`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTaskList(tasksres.data); //업무 목록 저장

        const reportres = await axios.get(`${BASE_URL}/reports/monthly`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            year: year,
            month: month,
          },
        });
        setReportInfo(reportres.data); //보고서 정보 저장

        //가져온 보고서 정보를 통해 오늘 날짜의 보고서 ID를 가져옴
        const desiredDate = `${year}-${month}-${day}`;
        const foundData = reportres.data.find((data) => data.date === desiredDate);
        const reportId = foundData ? foundData.reportId : null;

        //보고서 id가 없으면 review에 null값을 넣어줌
        if (reportId === null) {
          dispatch(setReview(null));
        } else {
          //보고서 id가 있으면 해당 보고서의 리뷰를 가져옴
          const reviewres = await axios.get(`${BASE_URL}/reports/myReports/${reportId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          //가져온 리뷰를 리덕스에 저장
          dispatch(setReview(reviewres.data.review));

          console.log('리뷰 가져왓는데요');
          console.log(reviewres.data.review);
          reviewInputRef.current.value = reviewres.data.review;
        }

        //가져온 보고서 정보를 통해 진행도 계산
        const completedTasks = tasksres.data.filter((task) => task.isCompleted === true);
        const progress = Math.floor((completedTasks.length / tasksres.data.length) * 100);
        setProgress(progress);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };
    fetchData();
  }, [dispatch, accessToken, submittedReview]);

  // console.log("taskList", taskList);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/reports`,
        {
          review: reviewInputRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(setReview(oneLineReview)); // 리뷰를 리덕스 스토어에 설정

      console.log('Review submitted successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const inputvalue = event?.target?.value;
    setInputValue(inputvalue); // 입력 값 변경 이벤트 핸들러
  };

  const handleshowSelectedTask = (id) => {
    setSelectedTaskId(id);
    const selectedTask = taskList.find((task) => task.id === id);
    setSelectedTaskImage(selectedTask.completionImage);
    setSelectedTaskTitle(selectedTask.title);
    setShowtask(true);
  };
  console.log(userInfo.name);
  console.log('selectedTaskImage', selectedTaskImage);
  console.log('selectedTaskTitle', selectedTaskTitle);

  return (
    <div css={reportContainer}>
      <div css={title}>업무 보고서</div>

      <div css={selectedimage}>
        {/* 선택한 업무 크게 보기 */}
        {showtask ? (
          <div
            style={{
              position: 'relative',
              maxWidth: 345,
              width: '100%',
              height: '25vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={selectedTaskImage || noimage}
              loading="lazy"
              alt={`Task ${selectedTaskId}`}
              style={{
                width: '90%',
                height: '80%',
                border: '10px solid #8ea8db',
                borderRadius: '20px',
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '10px',
                transform: 'translateX(7%)',
                padding: '10px',
                textAlign: 'start',
                fontSize: '1.25rem',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {selectedTaskTitle}
            </div>
          </div>
        ) : (
          <div>
            <p>업무를 선택해주세요</p>
          </div>
        )}
      </div>
      <div css={percent}>
        <div css={percentw}>진행도</div>
        <progress css={progressStyle} max="100" value={progress}></progress>

        <div css={percenetnum}>{progress}%</div>
      </div>
      <div css={table}>
        {/* 업무 리스트 with 사진 */}
        <Card variant="outlined" sx={{ width: '100vw', p: 0 }}>
          <List
            sx={{
              maxHeight: '25vh',
              overflow: 'auto',
            }}
          >
            {taskList.map((item, index) => (
              <React.Fragment key={item.title}>
                <ListItem
                  onClick={() => {
                    handleshowSelectedTask(item.id);
                  }}
                >
                  <ListItemButton sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* <AspectRatio sx={{ flexBasis: 120 }}>
                      <img
                        srcSet={`${item.completionImage}?w=120&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.completionImage}?w=120&fit=crop&auto=format`}
                        alt={`Task ${index}`}
                        css={{ width: "100%", height: "auto" }}
                      />
                    </AspectRatio> */}
                    <ListItemContent sx={{ flex: '6' }}>
                      <Typography>{item.title}</Typography>
                    </ListItemContent>
                    <Icon sx={{ flex: '1' }}>
                      {item.isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                    </Icon>
                  </ListItemButton>
                </ListItem>
                {index !== taskList.length - 1 && <ListDivider />}
              </React.Fragment>
            ))}
          </List>
        </Card>
      </div>
      <div css={sendreview}>
        <textarea ref={reviewInputRef} style={{ paddingTop: '10px', height: '80%' }}>
          {submittedReview}
        </textarea>
        <div
          css={submitbtn}
          onClick={() => {
            setOpen(true);
          }}
        >
          제출하기
        </div>
      </div>
      <div css={submitModal}>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>제출하시겠습니까?</DialogTitle>
            <DialogContent>제출 후엔 수정이 불가능합니다.</DialogContent>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>본인 확인</FormLabel>
                  <Input
                    placeholder="본인 확인을 위한 이름 작성"
                    autoFocus
                    required
                    value={inputValue}
                    onChange={handleInputChange}
                  />

                  {inputValue !== userInfo.name && (
                    <p style={{ fontSize: '12px', color: 'red' }}>입력한 이름이 본인의 이름과 일치하지 않습니다.</p>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  onClick={() => {
                    console.log('뭔데');
                    handleSubmit();
                  }}
                  disabled={inputValue !== userInfo.name}
                >
                  제출
                </Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </div>
    </div>
  );
};

export default Dailyreport;

//#8EA8DB

// #C4DEFF

const reportContainer = css`
  display: grid;
  grid-template-rows: 1fr 3fr 1fr 3fr 4fr;
  grid-template-columns: 1fr; /* 좌우에 남는 공간 없이 1개의 컬럼으로 설정 */
  justify-content: center;
  align-items: center;
  justify-items: center; /* 수평 가운데 정렬 */
  align-self: center; /* 수직 가운데 정렬 */
  height: 100%;
  width: 100vw;
`;

const title = css`
  grid: 1;
  height: 100%;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  align-items: end;
`;

const selectedimage = css`
  grid: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const percent = css`
  grid: 3;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const progressStyle = css`
  grid-column: 2;
  height: 50%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  -webkit-appearance: none; //--> 기존 bar style 변경
  appearance: none;

  /* 원하는 색상으로 변경하세요 */

  ::-webkit-progress-bar {
    // webkit 브라우저에서 bar style 변경
    background-color: #c4deff; /* 원하는 배경색으로 변경 */
    border-radius: 20px; /* 둥글게 만들기 위한 테두리 반지름 값 설정 */
  }
  &::-webkit-progress-value {
    // webkit 브라우저에서 bar style 변경
    background-color: #8ea8db;
    border-radius: 20px;
  }

  &::-moz-progress-bar {
    // moz 브라우저에서 bar style 변경
    background-color: black;
  }

  &::-ms-fill {
    // ms 브라우저에서 bar style 변경
    background-color: black;
  }
`;
const percentw = css`
  grid-column: 1;
  height: 100%;
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
`;

const percenetnum = css`
  grid-column: 3;
  height: 100%;
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
`;

const table = css`
  grid: 4;
  display: flex;
  justify-content: center;
  align-self: flex-start;
`;

const sendreview = css`
  grid: 5;
  grid-template-rows: 1fr;
  display: grid;
  justify-content: center;
  height: 100%;
  width: 80vw;
  textarea {
    width: 80vw;
    height: 25vh;
    border: none;
    border-radius: 15px;
    outline: none;
    padding: 10px;
    background-color: rgb(233, 233, 233);
    word-wrap: break-word;
    resize: none;
  }
`;

const submitModal = css`
  border: 1px solid #ccc;
`;

const submitbtn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  background-color: #c4deff;
  border-radius: 30px;
`;

const isReview = css`
  font-size: 1.25rem;
  padding: 5px;
  display: flex;
  align-items: center;
  background-color: #c4deff;
  height: 100%;
  overflow: auto;
`;
