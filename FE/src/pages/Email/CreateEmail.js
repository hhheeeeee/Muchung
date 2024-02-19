/** @jsxImportSource @emotion/react */
import { useState, useRef } from 'react';
import { css } from '@emotion/react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { BASE_URL } from 'api/config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useDebounce = function (callback, delay) {
  const debounceTimer = useRef(null);

  return (...args) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

const CreateEmail = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState(
    '<br><br><br><br><br><br>--------------------------------------------------------------------------Copyright@2033 무업청년들. ALL RIGHTS RESERVED.'
  );
  const [subject, setSubject] = useState('');
  const [recipient, setRecipient] = useState('');
  const [recipientid, setRecipientid] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 열림 상태 추가

  const modules = {
    toolbar: {
      container: [[{ header: [1, 2, 3, 4, 5, false] }], ['bold', 'underline']],
    },
  };

  const handleChangeContent = (value) => {
    setContent(value);
  };

  const handleChangeSubject = (event) => {
    setSubject(String(event.target.value));
  };

  const handleChangeRecipient = (event) => {
    const newValue = event.target.value;
    setRecipient(newValue);
    debouncedRequest(newValue);
  };

  const handleSelectRecipient = (selectedRecipient) => {
    setRecipient(selectedRecipient.name);
    setRecipientid(selectedRecipient.id); // 선택한 받는 사람의 id 값을 설정합니다.
    console.log(selectedRecipient.id);
    setDropdownOpen(false);
  };

  const getRecipient = async (val) => {
    // 비동기 함수로 변경
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          keyword: val, // 검색어를 val로 변경
        },
      };
      if (localStorage.getItem('token')) {
        const response = await axios.get(`${BASE_URL}/member/autocomplete`, config); // await 키워드 추가
        const copy = [...response.data]; // 기존의 recipients 배열과 response.data 배열을 병합
        setRecipients(copy);
        setDropdownOpen(true); // 드롭다운 열림 상태 업데이트
      }
    } catch (err) {
      console.log('자동완성', err);
    }
  };

  const debouncedRequest = useDebounce(getRecipient, 500);

  const handleSend = async () => {
    if (!subject || !content || !recipientid) {
      Swal.fire({
        // title: "!",
        text: '필수 항목을 모두 작성해주세요',
        // icon: "warning",
        confirmButtonText: '확인',
        width: '15rem',
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const data = {
        title: subject,
        content: content,
        receiverId: recipientid,
      };

      axios.post(`${BASE_URL}/mails`, data, config);
      console.log('보내기 성공?');
      navigate('/email/received');
    } catch (err) {
      console.log('자동완성', err);
    }
  };

  return (
    <div css={container}>
      <h2 className="header">
        메일 쓰기
        <Button variant="soft" onClick={handleSend}>
          보내기
        </Button>
      </h2>
      <div className="line">
        <span className="label">제목</span>

        <Input
          placeholder="제목을 입력해주세요"
          variant="soft"
          type="text"
          value={subject}
          onChange={handleChangeSubject}
          className="input"
        />
      </div>
      <div className="line">
        <span className="label">받는 사람</span>
        <div className="dropdown-container">
          <Input
            placeholder="수신자"
            variant="soft"
            type="text"
            value={recipient}
            onChange={handleChangeRecipient}
            className="input"
          />
          {dropdownOpen && (
            <ul className="dropdown-list">
              {recipients.map((option) => (
                <li key={option.name} className="dropdown-item" onClick={() => handleSelectRecipient(option)}>
                  {option.email}({option.name})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ReactQuill
        style={{ width: '90%', height: '55%' }}
        modules={modules}
        value={content}
        onChange={handleChangeContent}
      />
    </div>
  );
};

export default CreateEmail;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  width: 100%;
  background-color: white;

  .header {
    width: 90%;
    height: 5%;
    border-bottom: 3px solid grey;
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
    width: 20%;
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
