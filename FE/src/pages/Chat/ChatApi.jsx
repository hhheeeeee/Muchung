import axios from 'axios';
import { BASE_URL } from 'api/config';

// ChatGPT에 messages를 들고 가서 답변을 받아온다.
// chatItems.map(item => ({ role: item.role, content: item.content }))
export const getTextFromChatGpt = (messages) => {
    return axios.post(`https://api.openai.com/v1/chat/completions`,
        {
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.8,
            max_tokens: 600
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_API_TOKEN}`
            }
        })
    .then((res) => {
        // console.log("[axios] 일딴! 지피티가 준 응답은: ");
        // console.log(res.data.choices[0].message.content);
        return res.data.choices[0].message.content;
    })
    .catch((error) => {
        console.log(error);
        // chatItems[chatItems.length - 1].error = true
        return null;
    })
};

// 보고서 작성
export async function createReportApi(review) {
    await axios.post(
        `${BASE_URL}/reports`,
        {
            review: review
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    )
    .catch((error) => {
        console.log(error);
        // alert('보고서 작성에 실패하였습니다!');
    });
}

// 유저의 오늘 [업무 / 이행 여부] 조회
export async function getTaskAndIsCompletedApi() {
    try {
        const response = await axios.get(
            `${BASE_URL}/tasks/chat?date=` + getTodayDate(),
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
        });
        return response.data;
    } catch (e) {
        console.log("에러 발생!");
        return null;
    };
}

// 추천 업무 저장
export async function postRecommendationApi(title, reason) {
    await axios.post(
        `${BASE_URL}/recommend`,
        {
            title: title,
            reason: reason
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    )
    .catch((error) => {
        console.log(error);
        // alert('추천 업무 저장에 실패하였습니다!');
    });
}

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month =
    today.getMonth() + 1 > 10
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1);
    const day = today.getDate();
    return year + "-" + month + "-" + day;
}