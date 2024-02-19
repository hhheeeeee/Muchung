/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
<<<<<<< HEAD
import { useState, useEffect } from "react";
import axios from "axios";
=======
import { useState } from "react";
// import axios from "axios";
>>>>>>> feature/FE/navbar

function Todolist() {
  const [todos, setTodos] = useState([
    "Example Todo 1",
    "Example Todo 2",
    "Example Todo 3"
  ]);
  const [imageExists, setImageExists] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const date = new Date();

  useEffect(() => {
    // axios.get('http://localhost:3001/api/todolist')
    //   .then((response) => {
    //     setTodos(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    

    axios.get('http://localhost:3001/api/image')
      .then((response) => {
        setImageExists(true);
      })
      .catch((error) => {
        setImageExists(false);
      });
  }, []);

<<<<<<< HEAD
  const handleRegister = () => {
    const newTodos = [...todos, "새로운 업무"];
    setTodos(newTodos);
    document.querySelector(".input").style.display = "none";
    axios.post('http://localhost:3001/api/todolist', { todo: newTodo })
      .then((response) => {
        setTodos(response.data);
        setNewTodo("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImage = () => {
    setIsModalOpen(true);
    

    axios.put('http://localhost:3001/api/image')
      .then((response) => {
        // 이미지 업데이트를 처리하는 부분
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);





    axios.delete(`http://localhost:3001/api/todolist/${index}`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div css={container}>
      <p>{date.toLocaleDateString()} 업무 계획      <button onClick={() => {
        document.querySelector(".input").style.display = "flex";
      }}>+</button></p>

      <div>

        <ul>

          {todos.map((todo, index) => (
            <li key={index}>
        {imageExists ? (
          "✔"
        ) : (
          "🤔"
        )}
              {todo}
              <button onClick={handleImage}>이미지</button>
              <button onClick={() => handleDelete(index)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
      <div className = "input">
        
        <input 
          type="text"
          placeholder="할 일을 입력하세요"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleRegister}>등록</button>
        <button onClick={()=> {
          document.querySelector(".input").style.display = "none";
        }} >취소</button>
      </div>
=======
  // const handleRegister = () => {
  //   axios.put('http://localhost:3001/api/todo'
  //   ).then((response) => {
  //     setTodos(response.data);
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // };

  // const handleImage = () => {
  //   axios.put('http://localhost:3001/api/image'
  //   ).then((response) => {
  //     setTodos(response.data);
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // };

  // const handleDelete = (index) => {
  //   axios.delete('http://localhost:3001/api/todo'
  //   ).then((response) => {
  //     setTodos(response.data);
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // };

  return (
    <div css={container}>
      <h1>TodoList</h1>

      <input type="text" />
      <div>
        <button>Register</button>
        <button>Image</button>
        {/* <button onClick={handleRegister}>Register</button>
        <button onClick={handleImage}>Image</button> */}
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button>Delete</button>
            {/* <button onClick={() => handleDelete(index)}>Delete</button> */}
          </li>
        ))}
      </ul>
>>>>>>> feature/FE/navbar
    </div>
  );
}

export default Todolist;

const container = css`
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  border-radius: 10px;

  .input {
    display : none;
  }
`;
