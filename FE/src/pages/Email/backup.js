/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Table from "@mui/joy/Table";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { DataGrid } from "@mui/x-data-grid";

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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const RecievedEmail = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div css={container}>
      <h2 className="header">받은 편지함</h2>
      <Table
        className="table"
        sx={{ "& thead th:nth-child(4)": { width: "40%" } }}
      >
        <thead>
          <tr>
            <th>삭제</th>
            <th>관심</th>
            <th>보낸 사람</th>
            <th>제목</th>
            <th>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </td>
              <td>
                {" "}
                <Checkbox
                  {...label}
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
      <Pagination count={10} size="small" />
    </div>
  );
};

export default RecievedEmail;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 20px;

  .header {
    width: 90%;
    border-bottom: 3px solid grey;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    margin: 10px 0px;
    font-weight: 700;
    font-size: 1.5rem;
  }

  .table {
    width: 90%;
  }
`;
