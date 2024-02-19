// import { useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "api/config";

// export const tempAccessToken = (setAccessToken, setUser) => {
//   useEffect(() => {
//     const fetchDatamember = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/token`);
//         const fetchedData = response.data;

//         setAccessToken(fetchedData);

//         const userData = await axios.get(
//           `${BASE_URL}/member/memberInformation`,
//           {
//             headers: {
//               Authorization: `Bearer ${fetchedData}`,
//             },
//           }
//         );

//         setUser(userData.data);
//         // console.log(userData);
//         // console.log(userData.data.name);
//       } catch (error) {
//         console.error("데이터를 불러오는 중 에러 발생:", error);
//       }
//     };

//     fetchDatamember();
//   }, [setAccessToken, setUser]);
//   return
// };

import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "api/config";

const TempAccessTokenComponent = ({ setAccessToken, setUser }) => {
  useEffect(() => {
    const fetchDatamember = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/token`);
        const fetchedData = response.data;

        setAccessToken(fetchedData);

        const userData = await axios.get(
          `${BASE_URL}/member/memberInformation`,
          {
            headers: {
              Authorization: `Bearer ${fetchedData}`,
            },
          }
        );

        setUser(userData.data);
        // console.log(userData);
        // console.log(userData.data.name);
      } catch (error) {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      }
    };

    fetchDatamember();
  }, [setAccessToken, setUser]);
};

export default TempAccessTokenComponent;
