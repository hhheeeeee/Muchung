/* eslint-disable */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import blankimg from "./../../assets/blankimg.jpg";
import { Mobile, PC } from "components/common/Responsive";
import { BASE_URL } from "api/config";

const steps = ["개인 정보 입력", "인적성 검사", "최종 제출"];

function PersonalInfo() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(blankimg);
  const [email, setEmail] = useState("");
  const [userinfo, setUserinfo] = useState({
    name: "",
    phone: "",
    description: "",
    profileImage: imageSrc ? imageSrc : null,
  });

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || blankimg); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  const handleNext = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/member`,
        {
          profileImage: String(userinfo.profileImage),
          name: userinfo.name,
          description: userinfo.description,
          phone: String(userinfo.phone),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // 요청이 성공한 경우에만 페이지 이동
      if (response.status === 200) {
        console.log(userinfo);
        navigate("/signup/ncs");
      } else {
        console.log("오류 발생");
      }
    } catch (error) {
      console.log(error);
      // 오류 발생시 실행
    }
  };

  const handleInputChange = (property) => (event) => {
    setUserinfo((prevUserinfo) => ({
      ...prevUserinfo,
      [property]: String(event.target.value),
    }));
    // console.log(userinfo);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/member/email`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setEmail(response.data);
      })
      .catch(() => {
        console.log("이메일 가져오기 실패함");
      });
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div css={mobilecontainer}>
        <p className="contentheader">입 사 지 원 서</p>

        <div className="userinput">
          <div className="userform">
            <div className="picture">
              <div className="userpicarea">
                <img className="userpic" src={imageSrc} />
              </div>
              <div className="upload">
                <label htmlFor="uploadimg" className="imglabel">
                  프로필 사진 등록
                </label>
                <input
                  id="uploadimg"
                  className="uploadimg"
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={(e) => onUpload(e)}
                />
              </div>
            </div>

            <div className="text">
              <div className="form-group">
                <label>👋 이름</label>
                <input
                  type="text"
                  placeholder="여기에 이름을 입력해주세요!"
                  onChange={handleInputChange("name")}
                />
              </div>
              <div className="form-group">
                <label>📧 이메일</label>
                <input
                  type="text"
                  placeholder="여기에 이메일을 입력해주세요!"
                  value={email}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>📞 전화번호</label>
                <input
                  type="number"
                  placeholder="여기에 전화번호를 입력해주세요!"
                  onChange={handleInputChange("phone")}
                />
              </div>
              <div className="form-group">
                <label>💼 간단한 소개</label>
                <input
                  type="text"
                  placeholder="당신을 가장 잘 나타낼 수 있는 몇 문장을 적어주세요!"
                  onChange={handleInputChange("description")}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="next" onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
}

export default PersonalInfo;

const mobilecontainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  .contentheader {
    font-size: 2rem;
    font-weight: 500;
  }

  .userinput {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .userform {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 5px 30px;
    /* border-radius: 10px; */
  }

  .text {
    width: 70%;
  }

  .picture {
    width: 40%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    /* background-color: grey; */
  }

  .userpicarea {
    border: 3px solid #9e9e9e;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }

  .userpic {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .uploadimg {
    display: none; // 기본 파일 업로드 버튼을 숨김
  }

  .imglabel {
    background-color: #9e9e9e; /* 버튼 배경색 */
    color: white; /* 글자색 */
    cursor: pointer; /* 마우스를 올렸을 때 커서 모양 변경 */
    border-radius: 5px; /* 버튼 모서리 둥글게 */
    font-size: 0.8rem;
    padding: 0.2rem 0.2rem;
    :hover {
      background-color: #939393; /* 마우스를 올렸을 때 버튼 배경색 변경 */
    }
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-size: 1em;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    font-size: 0.8em;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .next {
    padding: 10px 20px;
    background-color: rgb(48, 141, 229);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
  }

  .next:hover {
    background-color: #1976d2;
  }
`;

const containerStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .content {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    padding: 20px;
    background-color: rgb(249, 249, 249);
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .contentheader {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .userinput {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .userform {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 30px 30px;
    border: 1px solid black;
    /* border-radius: 10px; */
  }

  .text {
    width: 70%;
  }

  .picture {
    width: 200px;
    height: 250px;
    border: 1px solid black;
    /* background-color: grey; */
    margin-right: 20px;
  }

  .userpicarea {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .userpic {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .upload-label {
    cursor: pointer;
    background-color: rgb(48, 141, 229);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }

  .upload-label:hover {
    background-color: #1976d2;
  }

  .uploadimg {
    display: none; /* 기본 파일 업로드 버튼 감춤 */
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-size: 1em;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    font-size: 0.8em;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .next {
    padding: 10px 20px;
    background-color: rgb(48, 141, 229);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  .next:hover {
    background-color: #1976d2;
  }
`;
