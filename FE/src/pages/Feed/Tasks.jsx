import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Task, Text, Img, Toggles, Toggle, TaskItem } from './FeedStyle';

function Tasks({ tasks }) {
  const [curIndex, setCurIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurIndex((curIndex + 1) % tasks.length);
    },
    onSwipedRight: () => setCurIndex((curIndex - 1 + tasks.length) % tasks.length),
    trackMouse: true,
  });

  return (
    <>
      <Task {...handlers}>
        {tasks.map((task, index) => (
          <TaskItem key={task.id} display={index === curIndex}>
            <Text>{task.title}</Text>
            <Img>
              <img src={task.completionImage} draggable="false" alt="background" />
            </Img>
          </TaskItem>
        ))}
      </Task>
      <Toggles>
        {tasks.map((task, index) => (
          <Toggle key={task.id} display={index === curIndex} />
        ))}
      </Toggles>
    </>
  );
}

export default Tasks;
