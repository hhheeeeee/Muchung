// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
// import React, { useState, useEffect } from "react";
// import { Card, CardContent, Typography } from "@mui/material";
// import axios from "axios";
// import { CardActionArea, CardMedia } from "@mui/material";

// // const todo = axios.get("http://localhost:3001/api/todo");
// // const image = axios.get("http://localhost:3001/api/image");
// const todo = "업무 내용";
// const image = "https://source.unsplash.com/random";

// const TodoListCard = ({ todo, image }) => {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image={image}
//           alt="todolist image"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {todo}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             성공! 지연!
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// const Report = () => {
//   const [textBox, setTextBox] = useState("");
//   const [name, setName] = useState("");
//   const [department, setDepartment] = useState("");
//   const [currentDate, setCurrentDate] = useState(new Date());

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/name")
//       .then((response) => {
//         setName(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//     axios
//       .get("http://localhost:3001/api/department")
//       .then((response) => {
//         setDepartment(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("textBox", textBox);

//     fetch("http://localhost:3001/api/report", {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((json) => console.log(json));

//     setTextBox("");

//     alert("제출되었습니다.");

//     window.location.reload();
//   };

//   return (
//     <div css={Container}>
//       <div className="reportform">
//         <h1>업무 보고서</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="person">
//             <label>
//               <span>작성자 | {name}</span>

//               <span>소속 | {department}</span>

//               <span>날짜 | {currentDate.toLocaleDateString()}</span>
//             </label>
//           </div>

//           <br />

//           <div className="todoCard">
//             <h2>업무 내용</h2>
//             <TodoListCard todo={todo} image={image} />
//           </div>

//           <label>
//             한 줄평:
//             <textarea
//               value={textBox}
//               onChange={(e) => setTextBox(e.target.value)}
//             />
//           </label>
//           <br />
//           <button type="submit">제출하기</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Report;

// const Container = css`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;

//   .reportform {
//   }
// `;
