/* eslint-disable */
// 액세스 토큰 받기
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from 'api/config';
import { useDispatch } from 'react-redux';
import { setToken } from 'store/userSlice';

function KakaoLogin() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = new URL(window.location.href).searchParams.get('token');
    localStorage.clear();
    localStorage.setItem('token', token);

    axios
      .get(`${BASE_URL}/member/memberInfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const member = res.data;
        console.log('login member info : ' + member);
        localStorage.setItem('memberId', member.id);
        localStorage.setItem('department', member.departmentName);
        localStorage.setItem('profileImage', member.profileImage);
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(
      setToken({
        token: token,
      })
    );

    axios
      .get(`${BASE_URL}/member/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(async (response) => {
        const progress = response.data;
        console.log(`프로세스 : ${progress}`);

        console.log(progress);
        if (progress === 'INFORMATION') {
          navigate('/signup/ncs');
        } else if (progress === 'NCS') {
          const attendanceRes = await axios.get(`${BASE_URL}/attendance/attendanceInfo`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          console.log(attendanceRes.data);
          if (attendanceRes.data.startTime === undefined) {
            console.log('여기에 찍힘');
            navigate('/commute/checkIn');
          } else {
            console.log('여기에 기록 있음');
            console.log(attendanceRes.data.startTime);
            navigate('/main');
          }
        } else {
          navigate('/signup/personalinfo');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div css={container}>
      <section className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    </div>
  );
}

export default KakaoLogin;

const container = css`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;

  .dots-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .dot {
    height: 20px;
    width: 20px;
    margin-right: 10px;
    border-radius: 10px;
    background-color: #b3d4fc;
    animation: pulse 1.5s infinite ease-in-out;
  }

  .dot:last-child {
    margin-right: 0;
  }

  .dot:nth-of-type(1) {
    animation-delay: -0.3s;
  }

  .dot:nth-of-type(2) {
    animation-delay: -0.1s;
  }

  .dot:nth-of-type(3) {
    animation-delay: 0.1s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      background-color: #b3d4fc;
      box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }

    50% {
      transform: scale(1.2);
      background-color: #6793fb;
      box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
    }

    100% {
      transform: scale(0.8);
      background-color: #b3d4fc;
      box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }
  }
`;

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const KaKaoLogin = (props) => {
//   const navigate = useNavigate();
//   const code = new URL(window.location.href).searchParams.get("code");

//   //인가코드 백으로 보내는 코드
//   useEffect(() => {
//     const code = new URL(window.location.href).searchParams.get("code");
//     console.log(code);
// const kakaoLogin = async () => {
//   await axios({
//     method: "GET",
//     url: `${process.env.REACT_APP_REDIRECT_URL}/?code=${code}`,
//     headers: {
//       "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
//       "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
//     },
//   }).then((res) => {
//     //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
//     console.log(res);
//     //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
//     localStorage.setItem("name", res.data.account.kakaoName);
//     //로그인이 성공하면 이동할 페이지
//     navigate("/owner-question");
//   });
// };
// kakaoLogin();
// }, []);

//   return (
//     <div className="LoginHandeler">
//       <div className="notice">
//         <p>로그인 중입니다.</p>
//         <p>잠시만 기다려주세요.</p>
//         <div className="spinner"></div>
//         <div>{code}</div>
//       </div>
//     </div>
//   );
// };

// export default KaKaoLogin;
