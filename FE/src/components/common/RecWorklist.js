import { css } from "@emotion/react";
import { useState } from "react";

const RecWorklist = () => {
  const [worklist, setWorklist] = useState([]);

  return (
    <div css={container}>
      <h1>추천업무</h1>
      <div css={worklist}>
        <div css={work}>
          <p>업무1</p>
          {worklist.map((work, index) => {
            return <p key={index}>{work}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default RecWorklist;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const worklist = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const work = css`
  width: 100%;
  height: 100px;
  border: 1px solid black;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
