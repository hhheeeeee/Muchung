/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Table from "@mui/joy/Table";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";

function createData(id, name, title, createdAt) {
  return { id, name, title, createdAt };
}

const rows = [
  createData(1, "김태훈", "제목1111111111111111", "2024-01-01"),
  createData(2, "지준영", "제목2222222222222222", "2024-02-01"),
  createData(3, "김승희", "3333333333333333333", "2024-05-01"),
  createData(4, "김태훈", "44444444444제목4444", "2024-06-01"),
  createData(5, "지준영", "제목제목55555555555", "2024-07-01"),
  createData(6, "김승희", "제목제목666666", "2022-01-01"),
  createData(7, "지준영", "77제목제목제목제목", "2023-01-01"),
  createData(8, "김태훈", "888제8목제목제목제목", "2022-01-01"),
  createData(9, "김승희", "999제목제목제목제목", "2021-01-01"),
  createData(10, "김승희", "제목제1010목제목제목", "2024-01-01"),
  createData(11, "지준영", "제목제목11제목제목", "2027-01-01"),
  createData(12, "김태훈", "제목제목제1212목제목", "2028-01-01"),
  createData(13, "김승희", "제목1313제목제목제목", "2022-01-01"),
  createData(14, "지준영", "제1414목제목제목제목", "2021-01-01"),
  createData(15, "지준영", "제목제1515목제목제목", "2020-01-01"),
  createData(16, "김태훈", "제1616목제목제목제목", "2019-01-01"),
];

const RecievedEmailPC = () => {
  const [checkedItems, setCheckedItems] = useState(new Set()); // 체크된 항목을 저장할 Set
  const [likedItems, setLikedItems] = useState(new Set()); // 관심 항목을 저장할 Set
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 9; // 페이지 당 보여줄 항목 개수

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

  const handleLike = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // 관심 항목 추가
      setLikedItems((prevItems) => new Set(prevItems).add(id));
    } else {
      // 관심 항목 제거
      setLikedItems((prevItems) => {
        const updatedItems = new Set(prevItems);
        updatedItems.delete(id);
        return updatedItems;
      });
    }
  };

  // 현재 페이지에 해당하는 항목들을 계산합니다.
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 시 실행되는 함수
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // 체크박스 전체 선택 여부
  const isAllChecked =
    currentItems.length > 0 &&
    currentItems.every((row) => checkedItems.has(row.id));

  // 체크박스 전체 선택 이벤트 처리
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // 전체 항목 선택
      const newCheckedItems = currentItems.reduce(
        (set, row) => set.add(row.id),
        new Set()
      );
      setCheckedItems(newCheckedItems);
    } else {
      // 전체 항목 선택 해제
      setCheckedItems(new Set());
    }
  };

  // 선택한 행 css를 변환시키기 위한 목적의 함수
  // const [selectedRows, setSelectedRows] = useState(new Set()); // 선택된 행을 저장할 Set

  // const handleRowSelection = (event, id) => {
  //   const isChecked = event.target.checked;
  //   if (isChecked) {
  //     // 선택된 행 추가
  //     setSelectedRows((prevRows) => new Set(prevRows).add(id));
  //   } else {
  //     // 선택 해제된 행 제거
  //     setSelectedRows((prevRows) => {
  //       const updatedRows = new Set(prevRows);
  //       updatedRows.delete(id);
  //       return updatedRows;
  //     });
  //   }
  // };

  return (
    <div css={container}>
      <h2 className="header">받은 편지함</h2>
      <Table
        className="table"
        sx={{
          "& thead th:nth-of-type(1)": { width: "10%" },
          "& thead th:nth-of-type(2)": { width: "10%" },
          "& thead th:nth-of-type(4)": { width: "40%" },
        }}
      >
        <thead>
          <tr className="field">
            <th>
              <Checkbox
                size="small"
                checked={isAllChecked}
                onChange={handleSelectAll}
                inputProps={{ "aria-label": "controlled" }}
              />
            </th>
            <th>관심</th>
            <th>보낸 사람</th>
            <th>제목</th>
            <th>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row) => (
            <tr
              key={row.id}
              // className={selectedRows.has(row.id) ? "selected" : ""} // 선택된 행인 경우에 클래스 'selected' 추가
            >
              <td>
                <Checkbox
                  size="small"
                  checked={checkedItems.has(row.id)}
                  onChange={(event) => handleChange(event, row.id)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </td>
              <td>
                <Checkbox
                  size="small"
                  checked={likedItems.has(row.id)}
                  onChange={(event) => handleLike(event, row.id)}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "#ff564e" }} />}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.title}</td>
              <td>{row.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        count={Math.ceil(rows.length / itemsPerPage)} // 전체 페이지 개수 계산
        size="small"
        page={currentPage}
        onChange={handlePageChange}
        className="pagination"
      />
    </div>
  );
};

export default RecievedEmailPC;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 20px;

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

  .table {
    width: 90%;
    /* height: 80%; */
  }

  th {
    padding: 5px 0px;
  }

  td {
    padding: 0px 0px;
  }

  .pagination {
    margin-bottom: 20px;
    margin-top: auto;
  }
`;
