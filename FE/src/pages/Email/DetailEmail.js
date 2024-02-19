/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import Input from "@mui/joy/Input";
import ReactQuill from "react-quill";
import axios from "axios";
import { BASE_URL } from "api/config";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

const DetailEmail = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [email, setEmail] = useState(null);
  const handleBack = () => {
    if (type === "sender") {
      navigate("/email/received");
    } else {
      navigate("/email/sent");
    }
  };

  const modules = {
    toolbar: false,
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/mails/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setEmail(response.data);
    } catch (error) {
      console.error("이메일 상세 정보 받기 : ", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div css={container}>
      <h2 className="header">
        <Button
          onClick={handleBack}
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          뒤로가기
        </Button>
      </h2>
      {email ? (
        <>
          <div className="line">
            <span className="label">제목</span>
            <Input
              readOnly
              variant="soft"
              type="text"
              value={email.title}
              className="input"
            />
          </div>
          <div className="line">
            <span className="label">
              {type === "sender" ? "보낸 사람" : "받은 사람"}
            </span>
            <Input
              readOnly
              variant="soft"
              type="text"
              value={
                type === "sender" ? email.sender.name : email.receiver.name
              }
              className="input"
            />
          </div>
          <div className="line">
            <span className="label">부서</span>
            <Input
              readOnly
              variant="soft"
              type="text"
              value={
                type === "sender"
                  ? email.sender.departmentName
                  : email.receiver.departmentName
              }
              className="input"
            />
          </div>

          <div className="line">
            <span className="label">보낸 시간</span>
            <Input
              readOnly
              variant="soft"
              type="text"
              value={email.sentTime}
              className="input"
            />
          </div>
          <ReactQuill
            readOnly={true}
            style={{ width: "90%", height: "55%" }}
            modules={modules}
            value={email.content}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DetailEmail;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  width: 100%;
  background-color: white;

  .header {
    margin-top: 1rem;
    width: 90%;
    height: 1%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0px;
    font-weight: 700;
    font-size: 1.5rem;
  }

  .line {
    width: 90%;
    display: flex;
    margin: 10px 0px;
    align-items: center;
  }

  .label {
    font-weight: bold;
    width: 25%;
    flex-shrink: 0;
  }

  .input {
    flex-grow: 1;
  }

  .dropdown-container {
    position: relative;
  }

  .dropdown-container .input {
    width: 200px;
    padding: 8px;
  }

  .dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 8px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-top: none;
    list-style: none;
    margin-top: 0;
    z-index: 1;
  }

  .dropdown-item {
    padding: 8px;
    cursor: pointer;
  }

  .dropdown-item:hover {
    background-color: #e2e2e2;
  }
`;
