/* eslint-disable */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Table from "@mui/joy/Table";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "api/config";
import RecievedEmailPC from "./RecievedEmailPC";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import EmailNavbarMobile from "./EmailNavbarMobile";
import Button from "@mui/material/Button";

const SentEmail = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set()); // 체크된 항목을 저장할 Set
  const [likedItems, setLikedItems] = useState(new Set()); // 관심 항목을 저장할 Set

  const handleChange = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // 체크된 항목 추가
      setCheckedItems((prevItems) => new Set(prevItems).add(id));
    } else {
      // 체크 해제된 항목 제거
      setCheckedItems((prevItems) => {
        const updatedItems = new Set(prevItems);
        updatedItems.delete(id);
        return updatedItems;
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/mails/interest`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const getemails = response.data;
      setRows(getemails);
    } catch (error) {
      console.error("받은 이메일 목록 받기 : ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    navigate("/email/create");
  };

  const handeleDelete = async () => {
    // Set 객체를 문자열로 변환
    const checkedItemsString = Array.from(checkedItems).join(",");

    // URL에 직접 삽입
    console.log(`${BASE_URL}/mails/delete/${checkedItemsString}`);

    try {
      const response = await axios.patch(
        `${BASE_URL}/mails/delete/${checkedItemsString}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
    } catch (error) {
      console.error("이메일 삭제: ", error);
    }
  };

  const handleDetailClick = (id) => {
    navigate(`/email/detail/receiver/${id}`);
  };
  return (
    <>
      <div css={container}>
        <h2 className="header">
          <div>
            <span className="headertitle">보관함</span>
            <Button
              variant="outlined"
              size="small"
              className="delete"
              onClick={handeleDelete}
            >
              삭제
            </Button>
          </div>
          <EmailNavbarMobile></EmailNavbarMobile>
        </h2>
        <Table
          className="table"
          sx={{
            "& thead th:nth-of-type(1)": { width: "10%" },
            "& thead th:nth-of-type(2)": { width: "20%" },
            "& thead th:nth-of-type(3)": { width: "20%" },
            "& thead th:nth-of-type(4)": { width: "40%" },
          }}
        >
          <thead>
            <tr className="field">
              <th style={{ padding: "0px 0px" }}>
                <Checkbox
                  size="small"
                  inputProps={{ "aria-label": "controlled" }}
                />
              </th>
              <th style={{ padding: "0px 0px" }}>보낸 사람</th>
              <th style={{ padding: "0px 0px" }}>받은 사람</th>
              <th style={{ padding: "0px 0px" }}>제목</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                // className={selectedRows.has(row.id) ? "selected" : ""} // 선택된 행인 경우에 클래스 'selected' 추가
              >
                <td style={{ padding: "0px 0px" }}>
                  <Checkbox
                    size="small"
                    checked={checkedItems.has(row.id)}
                    onChange={(event) => handleChange(event, row.id)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </td>
                <td style={{ padding: "0px 0px" }}>{row.senderName}</td>
                <td style={{ padding: "0px 0px" }}>{row.receiverName}</td>
                <td
                  onClick={() => handleDetailClick(row.id)}
                  style={{ padding: "0px 0px" }}
                >
                  {row.title}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Fab
          color="primary"
          size="small"
          aria-label="edit"
          className="edit"
          onClick={handleEdit}
        >
          <EditIcon />
        </Fab>
      </div>
    </>
  );
};

export default SentEmail;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  width: 100%;
  background-color: white;
  position: relative;

  .header {
    width: 90%;
    height: 5%;
    border-bottom: 3px solid grey;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
    font-weight: 700;
    font-size: 1rem;
  }

  .headertitle {
    margin-right: 1rem;
  }
  .table {
    width: 90%;
    height: 80%;
    overflow: auto;
    /* height: 80%; */
  }

  .edit {
    position: fixed;
    bottom: 5rem;
    right: 3rem;
  }
`;
