/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// 예시 데이터
const todoData = [
    { image: 'https://source.unsplash.com/random', status: '완수', result: '성공' },
    { image: 'https://source.unsplash.com/random', status: '미완수', result: '지연' },
    { image: 'https://source.unsplash.com/random', status: '미완수', result: '지연' },
    { image: 'https://source.unsplash.com/random', status: '미완수', result: '지연' },
    { image: 'https://source.unsplash.com/random', status: '미완수', result: '지연' },
    { image: 'https://source.unsplash.com/random', status: '미완수', result: '지연' },
    { image: 'https://source.unsplash.com/random', status: '미완수', result: '지연' },
    { image: 'https://source.unsplash.com/random', status: '미완수', result: '지연' }
    // 추가 데이터...
  ];
  
//   const TodoList = () => {
//     return (
//       <div css={todoListContainer}>
//         {todoData.map((todo, index) => (
//           <TodoCard key={index} image={todo.image} status={todo.status} result={todo.result} />
//         ))}
//       </div>
//     );
//   };


  const TodoCard = ({ todoData}) => {
    return (
        <>        
        <Card sx={{ maxWidth: 1000, margin: 2}}>
        <div css={todoListContainer}>
            {todoData.map((todo, index) => (

      <Card kwy = {index} sx={{ maxWidth: 345, margin: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={todo.image}
            alt="todolist image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {todo.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {todo.result}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
            ))}
    </div>
    </Card>

    </>

    );
  };
  
  export default TodoCard;


const todoListContainer = css`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;  /* 가로 스크롤을 가능하게 합니다. */
  white-space: nowrap;  /* 자식 요소들이 가로로 나열되도록 합니다. */
  & > * {
    margin-right: 8px; /* 간격 조절 */
  }
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
  }
`;